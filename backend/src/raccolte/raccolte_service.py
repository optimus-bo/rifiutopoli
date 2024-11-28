from sqlalchemy import delete, extract, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from sqlalchemy.sql import func, case
from fastapi import (
    HTTPException,
    status,
)
from typing import Optional
from datetime import datetime, timedelta
from .raccolte_schemi import *


class RaccoltaInvalida(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ogni raccolta di rifiuti deve raccogliere un numero positivo di contenitori di rifiuti",
        )


async def find_raccolte(
    session: AsyncSession,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    esportato: Optional[bool] = None,
    aggrega: Optional[bool] = None,
    eager_mode: bool = False,
):
    query = select(Raccolta)

    if start_date is not None:
        query = query.where(Raccolta.data >= start_date)
    if end_date is not None:
        # avanza di un giorno per includere le raccolte nel giorno end_date
        end_date = end_date + timedelta(days=1)
        query = query.where(Raccolta.data <= end_date)
    if esportato is not None:
        query = query.where(Raccolta.esportato == esportato)
    if aggrega:
        pass  # TODO

    if eager_mode:
        query = query.options(selectinload(Raccolta.rifiuto))

    result = await session.execute(query)
    return result.scalars().all()


async def find_raccolte_aggregate(
    session: AsyncSession,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    esportato: bool = None,
    eager_mode: bool = False,
):
    grouped_query = (
        select(
            Raccolta.codice_eer,
            func.sum(Raccolta.quantita).label("quantita"),
            # func.min(Raccolta.data).label("min_data"),
            # func.max(Raccolta.data).label("max_data"),
            Rifiuto.codice_raggruppamento,
            Rifiuto.um,
            Rifiuto.codice_pittogramma,
        )
        .join(Rifiuto, Rifiuto.codice_eer == Raccolta.codice_eer)
        .where(Rifiuto.sfuso == False)
        .group_by(Raccolta.codice_eer, Rifiuto.codice_raggruppamento)
    )
    ungrouped_query = (
        select(
            Raccolta.codice_eer,
            Raccolta.quantita,
            Rifiuto.codice_raggruppamento,
            Rifiuto.um,
            Rifiuto.codice_pittogramma,
        )
        .join(Rifiuto, Rifiuto.codice_eer == Raccolta.codice_eer)
        .where(Rifiuto.sfuso)
    )

    if start_date:
        grouped_query = grouped_query.where(Raccolta.data >= start_date)
        ungrouped_query = ungrouped_query.where(Raccolta.data >= start_date)
    if end_date:
        # avanza di un giorno per includere le raccolte nel giorno end_date
        end_date = end_date + timedelta(days=1)
        grouped_query = grouped_query.where(Raccolta.data < end_date)
        ungrouped_query = ungrouped_query.where(Raccolta.data < end_date)
    if esportato is not None:
        grouped_query = grouped_query.where(Raccolta.esportato == esportato)
        ungrouped_query = ungrouped_query.where(Raccolta.esportato == esportato)

    query = grouped_query.union_all(ungrouped_query)
    result = await session.execute(query)
    return result.all()


async def salva_raccolte(session: AsyncSession, raccolte: list[RaccoltaCreate]):
    for raccolta in raccolte:
        nuova_raccolta = Raccolta(**raccolta.model_dump())
        nuova_raccolta.data = datetime.now()
        nuova_raccolta.esportato = False
        if nuova_raccolta.quantita <= 0:
            raise RaccoltaInvalida()

        session.add(nuova_raccolta)

    await session.commit()


async def elimina_raccolta(session: AsyncSession, anno: int, id: int):
    stmt = (
        delete(Raccolta)
        .where(extract("year", Raccolta.data) == anno)
        .where(Raccolta.id == id)
    )
    await session.execute(stmt)
    await session.commit()


async def segna_raccolte_esporate(
    session: AsyncSession,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    esportato: bool = None,
):
    query = update(Raccolta).values(esportato=True)

    if start_date:
        query = query.where(Raccolta.data >= start_date)
    if end_date:
        # avanza di un giorno per includere le raccolte nel giorno end_date
        end_date = end_date + timedelta(days=1)
        query = query.where(Raccolta.data < end_date)
    if esportato is not None:
        query = query.where(Raccolta.esportato == esportato)

    await session.execute(query)
    await session.commit()
