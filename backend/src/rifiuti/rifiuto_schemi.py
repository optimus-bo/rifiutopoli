from typing import Optional
from pydantic import BaseModel
from sqlalchemy import String, ForeignKey, Integer, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from ..db import BaseEntity


class Rifiuto(BaseEntity):
    __tablename__ = "rifiuto"
    codice_eer: Mapped[str] = mapped_column(String, primary_key=True)
    nome: Mapped[str] = mapped_column(String, nullable=True)
    descrizione: Mapped[str] = mapped_column(String, nullable=True)
    img_src: Mapped[str] = mapped_column(String, nullable=False)
    codice_pittogramma: Mapped[str] = mapped_column(String, nullable=True)
    codice_rdr: Mapped[str] = mapped_column(String, nullable=False)
    contenitore: Mapped[str] = mapped_column(String, nullable=False)


class RifiutoRead(BaseModel):
    codice_eer: str
    nome: str
    img_src: str
    codice_pittogramma: str
    codice_rdr: str
    contenitore: str

    class Config:
        orm_mode = True
        from_attributes = True


class RifiutoCreate(BaseModel):
    codice_eer: str
    codice_rdr: str
    contenitore: str
    nome: Optional[str] = None
    codice_pittogramma: Optional[str] = None

    class Config:
        orm_mode = True
        from_attributes = True
