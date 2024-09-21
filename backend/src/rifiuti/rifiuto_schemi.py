from typing import Optional
from pydantic import BaseModel
from sqlalchemy import String, ForeignKey, Integer, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from ..db import BaseEntity


class Rifiuto(BaseEntity):
    __tablename__ = "rifiuto"
    codice_cer: Mapped[str] = mapped_column(String, primary_key=True)
    nome: Mapped[str] = mapped_column(String)
    descrizione: Mapped[str] = mapped_column(String)
    img_src: Mapped[str] = mapped_column(String)
    # codice_pittogramma: Mapped[str] = mapped_column(String, nullable=True)
    # codice_rdr: Mapped[str] = mapped_column(String, nullable=False)
    # contenitore: Mapped[str] = mapped_column(String, nullable=False)


class RifiutoRead(BaseModel):
    codice_cer: str
    nome: str
    img_src: str

    class Config:
        orm_mode = True
        from_attributes = True


class RifiutoCreate(BaseModel):
    codice_cer: str
    nome: Optional[str] = None
    descrizione: str

    class Config:
        orm_mode = True
        from_attributes = True
