from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from .rifiuto_schemi import *


async def find_rifiuto(session: AsyncSession, codice_cer: str):
    result = await session.execute(
        select(Rifiuto).filter(Rifiuto.codice_cer == codice_cer)
    )
    rifiuto = result.scalars().first()

    if rifiuto is None:
        pass
    return rifiuto


async def find_rifiuti(session: AsyncSession):
    result = await session.execute(select(Rifiuto))
    return result.scalars().all()


async def insert_rifiuto(session: AsyncSession, rifiuto: RifiutoCreate):
    nuovo_rifiuto = Rifiuto(**rifiuto.model_dump())
    # TODO: implementare l'immagine per i rifiuti
    nuovo_rifiuto.img_src = ""
    session.add(nuovo_rifiuto)
    await session.commit()
    await session.refresh(nuovo_rifiuto)
    return await find_rifiuto(session, nuovo_rifiuto.codice_cer)


async def remove_rifiuto(session: AsyncSession, codice_cer: str):
    rifiuto = await find_rifiuto(session, codice_cer)
    await session.delete(rifiuto)
    await session.commit()
