from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import (
    HTTPException,
    status,
)
from .operatori_schemi import *


class OperatoreNotFound(HTTPException):
    def __init__(self, id: int):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"L'operatore con {id} non è stato trovato",
        )


async def find_operatore(session: AsyncSession, id: int):
    result = await session.execute(select(Operatore).filter(Operatore.id == id))
    rifiuto = result.scalars().first()

    if rifiuto is None:
        raise OperatoreNotFound(id)
    return rifiuto


async def find_operatori(session: AsyncSession):
    result = await session.execute(select(Operatore))
    return result.scalars().all()


async def insert_operatore(session: AsyncSession, operatore: OperatoreCreate):
    nuovo_operatore = Operatore(**operatore.model_dump())
    session.add(nuovo_operatore)
    await session.commit()
    await session.refresh(nuovo_operatore)
    return nuovo_operatore
    # return await find_rifiuto(session, nuovo_operatore.id)


async def remove_operatore(session: AsyncSession, id: int):
    rifiuto = await find_operatore(session, id)
    await session.delete(rifiuto)
    await session.commit()
