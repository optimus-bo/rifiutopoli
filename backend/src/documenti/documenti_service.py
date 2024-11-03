from sqlalchemy.ext.asyncio import AsyncSession
from openpyxl import load_workbook
from io import BytesIO
from datetime import datetime, timedelta
from calendar import monthrange
from collections import defaultdict
from ..raccolte.raccolte_service import find_raccolte_by_month, Raccolta


BASE_ROW = 13
capacita_contenitori = {
    "FP": 10,
    "TN": 1.5,
    "FP": 10,
    "TN": 1.5,
    "FF": 15,
    "SC": 1.5,
    "FF": 15,
    "SC": 1.5,
    "FC": 12,
    "IBC": 57,
    "CARTA": 1,
    "PLASTICA": 1,
    "LEGNO": 1,
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
    pass


async def report_raccolte_byte_buffer(
    session: AsyncSession, year: int, month: int
) -> BytesIO:
    raccolte_by_week = await weekly_partition(session, year, month)
    print(raccolte_by_week)

    # create an excel workbook and sheet
    workbook = load_workbook("doc_templates/report.xlsx")
    sheet = workbook.active
    sheet["E13"] = 42
    sheet["E15"] = 420
    sheet["F15"] = 69

    for index, (week, raccolte) in enumerate(raccolte_by_week.items()):
        week_row = BASE_ROW + 2 * index
        sheet[f"C{week_row}"] = week

    # sheet.title = "Resoconto scarico"
    # sheet.column_dimensions["A"].width = 20
    # sheet.column_dimensions["B"].width = 20
    # # write the column headers
    # sheet.append(["Data", "Codice EER", "N Contenitori", "Peso (kg)"])

    # for raccolta in raccolte:
    #     sheet.append(
    #         [
    #             raccolta.data.strftime("%d/%m/%Y %H:%M"),
    #             raccolta.codice_eer,
    #             raccolta.contenitori,
    #             raccolta.contenitori
    #             * capacita_contenitori[raccolta.rifiuto.contenitore],
    #         ]
    #     )

    # save the workbook to a bytes buffer
    buffer = BytesIO()
    workbook.save(buffer)
    buffer.seek(0)
    return buffer
