from fastapi import APIRouter
from fastapi.responses import FileResponse
from .immagini_service import *


router_immagini = APIRouter()


@router_immagini.get("/images/{image_name}")
def get_logo(image_name: str):
    return invia_immagine(image_name)


@router_immagini.get("/images/mappe/{codice_rdr}")
def get_mappa(codice_rdr: str):
    # TODO: da rimuovere quando abbiamo le mappe vere
    codice_rdr = "placeholder"
    return invia_immagine(f"mappeRDR/{codice_rdr}.jpg")
