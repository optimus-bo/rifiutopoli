from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import (
    HTTPException,
    status,
    UploadFile,
)
import os
from .rifiuto_schemi import *
from ..immagini.immagini_service import store_immagine_rifiuto


class RifiutoNotFound(HTTPException):
    def __init__(self, codice_cer: str):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Il rifiuto con codice CER {codice_cer} non è stato trovato",
        )


async def find_rifiuto(session: AsyncSession, codice_cer: str):
    result = await session.execute(
        select(Rifiuto).filter(Rifiuto.codice_cer == codice_cer)
    )
    rifiuto = result.scalars().first()

    if rifiuto is None:
        raise RifiutoNotFound(codice_cer)
    return rifiuto


async def find_rifiuti(session: AsyncSession):
    result = await session.execute(select(Rifiuto))
    return result.scalars().all()


async def insert_rifiuto(
    session: AsyncSession, rifiuto: RifiutoCreate, immagine: UploadFile
):
    nuovo_rifiuto = Rifiuto(**rifiuto.model_dump())
    # await per start sicuri che questa funzione termini e nuovo_rifiuto.img_src sia popolato
    await store_immagine_rifiuto(immagine, nuovo_rifiuto)

    session.add(nuovo_rifiuto)
    await session.commit()
    await session.refresh(nuovo_rifiuto)
    return await find_rifiuto(session, nuovo_rifiuto.codice_cer)


async def remove_rifiuto(session: AsyncSession, codice_cer: str):
    rifiuto = await find_rifiuto(session, codice_cer)
    await session.delete(rifiuto)
    await session.commit()
