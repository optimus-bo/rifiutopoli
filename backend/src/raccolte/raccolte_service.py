from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from fastapi import (
    HTTPException,
    status,
)
from typing import Optional
from datetime import datetime, timedelta
from calendar import monthrange
from .raccolte_schemi import *


class RaccoltaInvalida(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ogni raccolta di rifiuti deve raccogliere un numero positivo di contenitori di rifiuti",
        )


async def find_raccolte_by_month(
    session: AsyncSession, year: int, month: int, eager_mode: bool = False
):
    start_date = datetime(year, month, 1)
    last_day = monthrange(year, month)[1]
    end_datetime = datetime(year, month, last_day, 23, 59, 59)

    return await find_raccolte(
        session, start_date=start_date, end_date=end_datetime, eager_mode=eager_mode
    )


async def find_raccolte(
    session: AsyncSession,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    eager_mode: bool = False,
):
    query = select(Raccolta)

    if start_date is not None:
        query = query.where(Raccolta.data >= start_date)
    if end_date is not None:
        # avanza di un giorno per includere le raccolte nel giorno end_date
        end_date = end_date + timedelta(days=1)
        query = query.where(Raccolta.data <= end_date)

    if eager_mode:
        query = query.options(selectinload(Raccolta.rifiuto))

    result = await session.execute(query)
    return result.scalars().all()


async def salva_raccolte(session: AsyncSession, raccolte: list[RaccoltaCreate]):
    for raccolta in raccolte:
        nuova_raccolta = Raccolta(**raccolta.model_dump())
        nuova_raccolta.data = datetime.now()
        if nuova_raccolta.contenitori <= 0:
            raise RaccoltaInvalida()

        session.add(nuova_raccolta)

    await session.commit()
