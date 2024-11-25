from fastapi import APIRouter, Depends, Query, Response, status
from sqlalchemy.ext.asyncio import AsyncSession
from .raccolte_schemi import *
from .raccolte_service import *
from ..db import get_async_session


router_raccolte = APIRouter()


@router_raccolte.get("/raccolte")
async def get_raccolte(
    db: AsyncSession = Depends(get_async_session),
    start_date: Optional[datetime] = Query(None, description="Data di inizio"),
    end_date: Optional[datetime] = Query(None, description="Data di fine"),
    aggrega: Optional[bool] = Query(
        None, description="Aggrega i risultati secondo la lettera"
    ),
    esportato: Optional[bool] = Query(None, description="Solo esportate/non esportate"),
):
    async with db as session:
        return await find_raccolte(
            session,
            start_date=start_date,
            end_date=end_date,
            aggrega=aggrega,
            esportato=esportato,
            eager_mode=True,
        )


@router_raccolte.get("/raccolte-aggregate", response_model=list[RaccoltaAggregataRead])
async def get_raccolte(
    db: AsyncSession = Depends(get_async_session),
    start_date: Optional[datetime] = Query(None, description="Data di inizio"),
    end_date: Optional[datetime] = Query(None, description="Data di fine"),
    esportato: Optional[bool] = Query(None, description="Solo esportate/non esportate"),
):
    async with db as session:
        return await find_raccolte_aggregate(
            session,
            start_date=start_date,
            end_date=end_date,
            esportato=esportato,
            eager_mode=True,
        )


@router_raccolte.post("/raccolte")
async def registra_raccolta(
    raccolte: list[RaccoltaCreate], db: AsyncSession = Depends(get_async_session)
):
    async with db as session:
        await salva_raccolte(session, raccolte)
        return Response(status_code=status.HTTP_204_NO_CONTENT)
