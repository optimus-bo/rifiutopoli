from fastapi import (
    APIRouter,
)
from .rifiuto_schemi import RifiutoRead


rifiuti = [
    RifiutoRead(codice_cer="abc", nome="rifiuto 1"),
    RifiutoRead(codice_cer="abx", nome="rifiuto 2"),
    RifiutoRead(codice_cer="asa", nome="rifiuto 3"),
]


router_rifiuti = APIRouter()


@router_rifiuti.get("/rifiuti")
async def get_rifiuti():
    return rifiuti
