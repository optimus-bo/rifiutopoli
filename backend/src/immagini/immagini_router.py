from fastapi import APIRouter, Depends, HTTPException, status
import os
from fastapi.responses import FileResponse
from .immagini_service import *


router_immagini = APIRouter()


@router_immagini.get("/images/{image_name}")
def get_logo(image_name: str):
    return invia_immagine(image_name)
