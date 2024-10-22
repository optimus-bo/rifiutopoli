from fastapi import (
    APIRouter,
    Depends,
)
from sqlalchemy.ext.asyncio import AsyncSession
from .operatori_schemi import *
from .operatori_service import *
from ..db import get_async_session


router_operatori = APIRouter()


@router_operatori.get("/operatori")
async def get_rifiuti(db: AsyncSession = Depends(get_async_session)):
    async with db as session:
        return await find_operatori(session)


@router_operatori.post("/operatori")
async def post_rifiuti(
    operatore: OperatoreCreate,
    db: AsyncSession = Depends(get_async_session),
):
    async with db as session:
        return await insert_operatore(session, operatore)


@router_operatori.delete("/rifiuti/{id}")
async def delete_rifiuto(id: int, db: AsyncSession = Depends(get_async_session)):
    async with db as session:
        return await remove_operatore(session, id)
