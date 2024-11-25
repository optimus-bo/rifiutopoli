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
    # TODO: non group by gli sfusi
    query = (
        select(
            Raccolta.codice_eer,
            case(
                [(Rifiuto.sfuso == True, None)],  # No aggregation for sfuso rows
                else_=func.sum(Raccolta.quantita),
            ).label("quantita"),
            case(
                [
                    (Rifiuto.sfuso == True, Raccolta.data)
                ],  # Individual date for sfuso rows
                else_=func.min(Raccolta.data),
            ).label("min_data"),
            case(
                [
                    (Rifiuto.sfuso == True, Raccolta.data)
                ],  # Individual date for sfuso rows
                else_=func.max(Raccolta.data),
            ).label("max_data"),
            Rifiuto.codice_raggruppamento,
            Rifiuto.um,
            Rifiuto.codice_pittogramma,
        )
        .join(Rifiuto, Rifiuto.codice_eer == Raccolta.codice_eer)
        .group_by(
            case(
                [
                    (Rifiuto.sfuso == True, Raccolta.id)
                ],  # Grouping by individual row for sfuso
                else_=Raccolta.codice_eer,
            ),
            Rifiuto.codice_raggruppamento,
        )
    )

    if start_date:
        query = query.where(Raccolta.data >= start_date)
    if end_date:
        # avanza di un giorno per includere le raccolte nel giorno end_date
        end_date = end_date + timedelta(days=1)
    if esportato is not None:
        query = query.where(Raccolta.esportato == esportato)

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
