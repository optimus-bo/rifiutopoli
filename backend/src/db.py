from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from typing import AsyncGenerator


DATABASE_URL = "sqlite+aiosqlite:///./test.db"


class BaseEntity(DeclarativeBase):
    pass


# connessione al database
engine = create_async_engine(DATABASE_URL)
async_session_maker = async_sessionmaker(engine, expire_on_commit=False)


# setup del db e delle connessioni
async def crea_tabelle():
    async with engine.begin() as conn:
        await conn.run_sync(BaseEntity.metadata.create_all)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session
