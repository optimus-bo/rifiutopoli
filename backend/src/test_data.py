from datetime import datetime
from fastapi import APIRouter, Depends, Query, Response, status
from sqlalchemy.ext.asyncio import AsyncSession
from .rifiuti.rifiuto_schemi import Rifiuto
from .raccolte.raccolte_schemi import Raccolta
from .db import get_async_session


router_test = APIRouter()


async def insert_test_data(session: AsyncSession):
    rifiuti = [
        Rifiuto(
            codice_eer="EER 15.01.02",
            sfuso=False,
            codice_raggruppamento="A",
            img_src="/api/images/test.jpg",
            codice_rdr="RDR-6",
            contenitore="F.P",
            um="PZ",
            conversione=1.5,
        ),
        Rifiuto(
            codice_eer="EER 15.01.10*",
            sfuso=False,
            codice_raggruppamento="B",
            img_src="/api/images/test.jpg",
            codice_rdr="RDR-7",
            contenitore="F.P",
            um="PZ",
            conversione=1.5,
            codice_pittogramma="HP4+HP14",
        ),
        Rifiuto(
            codice_eer="EER 07.06.01*",
            sfuso=True,
            codice_raggruppamento="C",
            img_src="/api/images/test.jpg",
            codice_rdr="RDR-1",
            contenitore="taniche",
            um="KG",
            conversione=1,
            codice_pittogramma="HP5",
        ),
    ]

    month = 11
    raccolte = [
        # plastica non pericolosa
        Raccolta(
            codice_eer="EER 15.01.02",
            quantita=3,
            data=datetime(2024, month, 20, 11, 30, 00),
            esportato=False,
        ),
        Raccolta(
            codice_eer="EER 15.01.02",
            quantita=3,
            data=datetime(2024, month, 21, 11, 30, 00),
            esportato=False,
        ),
        Raccolta(
            codice_eer="EER 15.01.02",
            quantita=3,
            data=datetime(2024, month, 22, 11, 30, 00),
            esportato=False,
        ),
        # plastica pericolosa
        Raccolta(
            codice_eer="EER 15.01.10*",
            quantita=3,
            data=datetime(2024, month, 19, 11, 30, 00),
            esportato=False,
        ),
        Raccolta(
            codice_eer="EER 15.01.10*",
            quantita=3,
            data=datetime(2024, month, 20, 11, 30, 00),
            esportato=True,
        ),
        # liquido sfuso
        Raccolta(
            codice_eer="EER 07.06.01*",
            quantita=5,
            data=datetime(2024, month, 20, 11, 30, 00),
            esportato=False,
        ),
        Raccolta(
            codice_eer="EER 07.06.01*",
            quantita=6,
            data=datetime(2024, month, 21, 11, 30, 00),
            esportato=False,
        ),
    ]

    session.add_all(rifiuti)
    session.add_all(raccolte)
    await session.commit()


@router_test.post("/testdb")
async def registra_raccolta(db: AsyncSession = Depends(get_async_session)):
    async with db as session:
        await insert_test_data(session)
