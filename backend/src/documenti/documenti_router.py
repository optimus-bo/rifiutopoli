from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.ext.asyncio import AsyncSession
from .documenti_service import *
from ..db import get_async_session


router_documenti = APIRouter()


@router_documenti.get("/report-excel")
async def get_raccolte(
    db: AsyncSession = Depends(get_async_session),
) -> StreamingResponse:
    async with db as session:
        buffer = await report_raccolte_byte_buffer(session)
        return StreamingResponse(
            buffer,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            headers={"Content-Disposition": "attachment; filename=report.xlsx"},
        )
