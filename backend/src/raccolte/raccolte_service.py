from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import (
    HTTPException,
    status,
)
from .raccolte_schemi import *


class PesoInvalido(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ogni raccolta di rifiuti deve raccogliere un numero positivo di chili di rifiuti",
        )


async def find_raccolte(session: AsyncSession):
    result = await session.execute(select(Raccolta))
    return result.scalars().all()


async def salva_raccolte(session: AsyncSession, raccolte: list[RaccoltaCreate]):
    for raccolta in raccolte:
        nuova_raccolta = Raccolta(**raccolta.model_dump())
        nuova_raccolta.data = datetime.now()
        if nuova_raccolta.peso <= 0:
            raise PesoInvalido()

        session.add(nuova_raccolta)

    await session.commit()
