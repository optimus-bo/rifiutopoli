from sqlalchemy.ext.asyncio import AsyncSession
from openpyxl import load_workbook
from io import BytesIO
from datetime import datetime, timedelta
from calendar import monthrange
from collections import defaultdict
from ..raccolte.raccolte_service import find_raccolte_by_month, Raccolta


BASE_ROW = 13
capacita_contenitori = {
    "F.P": 10,
    "TN": 1.5,
    "F.P": 10,
    "TN": 1.5,
    "F.F": 15,
    "SC": 1.5,
    "F.F": 15,
    "SC": 1.5,
    "FC": 12,
    "IBC": 57,
    "CARTA": 1,
    "PLASTICA": 1,
    "LEGNO": 1,
}
colonne = {
    "plastica": {
        "EER 15.01.02": {"F.P": "D", "TN": "E"},
        "EER 15.01.10*": {"F.P": "F", "TN": "G"},
    },
    "metallo": {
        "EER 15.01.04": {"F.F": "H", "SC": "I"},
        "EER 15.01.10*": {"F.F": "J", "SC": "K"},
    },
    "misti": {
        "EER 15.01.06": {"FC": "L", "IBC": "M"},
        "EER 15.01.10*": {
            "IBC": "N",
        },
    },
    "sfuso": {
        "EER 15.01.01": {
            "CARTA": "P",
        },
        "EER 15.01.2": {
            "PLASTICA": "Q",
        },
        "EER 15.01.3": {
            "FLEGNO": "R",
        },
    },
}


async def weekly_partition(session: AsyncSession, year: int, month: int):
    def init_default_dict():
        raccolte_by_week = defaultdict(list)

        # Get the first and last day of the month
        start_date = datetime(year, month, 1)
        last_day = monthrange(year, month)[1]
        end_datetime = datetime(year, month, last_day)

        # Populate the dictionary with all possible week keys
        current_date = start_date
        while current_date <= end_datetime:
            week_index = current_date.isocalendar()[1]
            week_key = f"Sett-{week_index}"
            raccolte_by_week[week_key] = []
            current_date += timedelta(days=7 - current_date.weekday())
        return raccolte_by_week

    raccolte: list[Raccolta] = await find_raccolte_by_month(
        session, year, month, eager_mode=True
    )
    raccolte_by_week = init_default_dict()

    for raccolta in raccolte:
        week_index = raccolta.data.isocalendar()[1]  # ISO week number
        week_key = f"Sett-{week_index}"
        raccolte_by_week[week_key].append(raccolta)

    return dict(raccolte_by_week)


def aggregate_week(raccolte: list[Raccolta], sheet, week_row: int):
    aggregates = {}
    for raccolta in raccolte:
        materiale = raccolta.rifiuto.materiale
        codice_eer = raccolta.codice_eer
        codice_contenitore = raccolta.rifiuto.contenitore
        num_contenitori = raccolta.contenitori

        if materiale not in aggregates:
            aggregates[materiale] = {}
        if codice_eer not in aggregates[materiale]:
            aggregates[materiale][codice_eer] = {}
        if codice_contenitore not in aggregates[materiale][codice_eer]:
            aggregates[materiale][codice_eer][codice_contenitore] = 0

        aggregates[materiale][codice_eer][codice_contenitore] += num_contenitori

    for materiale in aggregates.keys():
        for codice_eer in aggregates[materiale].keys():
            for codice_contenitore, tot_contenitori in aggregates[materiale][
                codice_eer
            ].items():
                column = colonne[materiale][codice_eer][codice_contenitore]
                sheet[f"{column}{week_row}"] = tot_contenitori


async def report_raccolte_byte_buffer(
    session: AsyncSession, year: int, month: int
) -> BytesIO:
    raccolte_by_week = await weekly_partition(session, year, month)
    print(raccolte_by_week)

    # create an excel workbook and sheet
    workbook = load_workbook("doc_templates/report.xlsx")
    sheet = workbook.active

    for index, (week, raccolte) in enumerate(raccolte_by_week.items()):
        week_row = BASE_ROW + 2 * index
        sheet[f"C{week_row}"] = week
        aggregate_week(raccolte, sheet, week_row)

    # save the workbook to a bytes buffer
    buffer = BytesIO()
    workbook.save(buffer)
    buffer.seek(0)
    return buffer
