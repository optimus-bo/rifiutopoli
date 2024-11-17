from typing import Optional
from pydantic import BaseModel
from sqlalchemy import String, ForeignKey, Integer, Boolean, Double
from sqlalchemy.orm import Mapped, mapped_column, relationship
from ..db import BaseEntity


class Rifiuto(BaseEntity):
    __tablename__ = "rifiuto"
    codice_eer: Mapped[str] = mapped_column(String, primary_key=True)
    sfuso: Mapped[bool] = mapped_column(Boolean, nullable=False)
    codice_raggruppamento: Mapped[str] = mapped_column(String, nullable=False)
    img_src: Mapped[str] = mapped_column(String, nullable=False)
    codice_rdr: Mapped[str] = mapped_column(String, nullable=False)
    contenitore: Mapped[str] = mapped_column(String, nullable=False)
    um: Mapped[str] = mapped_column(String, nullable=True)
    conversione: Mapped[float] = mapped_column(Double, nullable=True)
    codice_pittogramma: Mapped[str] = mapped_column(String, nullable=True)


class RifiutoAPI(BaseModel):
    codice_eer: str
    sfuso: bool
    codice_raggruppamento: str
    codice_rdr: str
    contenitore: str
    codice_pittogramma: Optional[str] = None
    um: Optional[str] = None
    conversione: Optional[float] = None

    class Config:
        orm_mode = True
        from_attributes = True


class RifiutoRead(RifiutoAPI):
    img_src: str


class RifiutoCreate(RifiutoAPI):
    pass


class RifiutoUpdate(BaseModel):
    pass
