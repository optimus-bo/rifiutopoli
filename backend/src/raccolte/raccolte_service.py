from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
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
):
    query = select(Raccolta)

    if start_date is not None:
        query = query.where(Raccolta.data >= start_date)
    if end_date is not None:
        # avanza di un giorno per includere le raccolte nel giorno end_date
        end_date = end_date + timedelta(days=1)
        query = query.where(Raccolta.data <= end_date)

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
