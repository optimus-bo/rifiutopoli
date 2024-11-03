from fastapi import APIRouter, Depends, Query
from fastapi.responses import StreamingResponse
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional
from datetime import datetime
from .documenti_service import *
from ..db import get_async_session


router_documenti = APIRouter()


@router_documenti.get("/report-excel/{year}/{month}")
async def get_raccolte(
    year: int,
    month: int,
    db: AsyncSession = Depends(get_async_session),
) -> StreamingResponse:
    async with db as session:
        buffer = await report_raccolte_byte_buffer(session, year, month)
        return StreamingResponse(
            buffer,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            headers={"Content-Disposition": "attachment; filename=report.xlsx"},
        )
