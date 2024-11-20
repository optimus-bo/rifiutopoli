from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.ext.asyncio import AsyncSession
from .raccolte_schemi import *
from .raccolte_service import *
from ..db import get_async_session


router_raccolte = APIRouter()


@router_raccolte.get("/raccolte")
async def get_raccolte(db: AsyncSession = Depends(get_async_session)):
    async with db as session:
        return await find_raccolte(session, eager_mode=True)


@router_raccolte.post("/raccolte")
async def registra_raccolta(
    raccolte: list[RaccoltaCreate], db: AsyncSession = Depends(get_async_session)
):
    async with db as session:
        await salva_raccolte(session, raccolte)
        return Response(status_code=status.HTTP_204_NO_CONTENT)
