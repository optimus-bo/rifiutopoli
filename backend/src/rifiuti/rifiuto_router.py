from fastapi import (
    APIRouter,
    Depends,
    Form,
    File,
    UploadFile,
)
from sqlalchemy.ext.asyncio import AsyncSession
import json
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
    rifiuto: str = Form(...),
    immagine: UploadFile = File(...),
    db: AsyncSession = Depends(get_async_session),
):
    rifiuto_data = json.loads(rifiuto)
    rifiuto_create = RifiutoCreate(**rifiuto_data)
    async with db as session:
        return await insert_rifiuto(session, rifiuto_create, immagine)


@router_rifiuti.delete("/rifiuti/{codice_eer}")
async def delete_rifiuto(
    codice_eer: str, db: AsyncSession = Depends(get_async_session)
):
    async with db as session:
        return await remove_rifiuto(session, codice_eer)
