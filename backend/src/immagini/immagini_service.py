from fastapi import (
    HTTPException,
    status,
    UploadFile,
)
from fastapi.responses import FileResponse
import os
from ..rifiuti.rifiuto_schemi import Rifiuto


IMG_DIRECTORY = "../images"


class ExtensionNotAllowed(HTTPException):
    def __init__(self, extension: str):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"L'estensione {extension} non è accettata come immagine",
        )


class ImmagineNotFound(HTTPException):
    def __init__(self, nome: str):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"L'immagine con nome {nome} non è stata trovata",
        )


async def store_immagine_rifiuto(immagine: UploadFile, rifiuto: Rifiuto):
    ALLOWED_EXTENSIONS = [".png", ".jpg", ".jpeg"]
    filename, file_extension = os.path.splitext(immagine.filename)

    if file_extension not in ALLOWED_EXTENSIONS:
        raise ExtensionNotAllowed(file_extension)

    filename = f"{rifiuto.codice_eer}{file_extension}".replace(" ", "-")
    rifiuto.img_src = f"/images/{filename}"

    img_path = os.path.join(IMG_DIRECTORY, filename)
    with open(img_path, "wb") as img_file:
        img_file.write(await immagine.read())


def validate_image_name(image_name: str):
    if "/" in image_name or ".." in image_name:
        raise ImmagineNotFound(image_name)


def invia_immagine(image_name: str):
    validate_image_name(image_name)
    file_path = os.path.join(IMG_DIRECTORY, image_name)
    if not os.path.isfile(file_path):
        raise ImmagineNotFound(image_name)

    content_type = "image/png"  # TODO content type corretto
    return FileResponse(path=file_path, media_type=content_type)
