from fastapi import (
    APIRouter,
    Depends,
)
from sqlalchemy.ext.asyncio import AsyncSession
from .rifiuto_schemi import RifiutoRead
from .rifiuto_service import *
from ..db import get_async_session


router_rifiuti = APIRouter()


@router_rifiuti.get("/rifiuti")
async def get_rifiuti(db: AsyncSession = Depends(get_async_session)):
    async with db as session:
        return await find_rifiuti(session)


@router_rifiuti.post("/rifiuti")
async def post_rifiuti(
    rifiuto: RifiutoCreate, db: AsyncSession = Depends(get_async_session)
):
    async with db as session:
        return await insert_rifiuto(session, rifiuto)


@router_rifiuti.delete("/rifiuti/{codice_cer}")
async def delete_rifiuto(
    codice_cer: str, db: AsyncSession = Depends(get_async_session)
):
    async with db as session:
        return await remove_rifiuto(session, codice_cer)
