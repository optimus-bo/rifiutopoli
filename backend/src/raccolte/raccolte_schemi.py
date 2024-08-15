from datetime import datetime
from pydantic import BaseModel
from sqlalchemy import DateTime, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column
from ..db import BaseEntity


class Raccolta(BaseEntity):
    __tablename__ = "raccolta"
    id: Mapped[int] = mapped_column(primary_key=True)
    codice_cer: Mapped[str] = mapped_column(ForeignKey("rifiuto.codice_cer"))
    peso: Mapped[int] = mapped_column(Integer)
    data: Mapped[datetime] = mapped_column(DateTime)


class RaccoltaRead(BaseModel):
    id: int
    codice_cer: str
    peso: int
    data: datetime

    class Config:
        orm_mode = True
        from_attributes = True


class RaccoltaCreate(BaseModel):
    codice_cer: str
    peso: int

    class Config:
        orm_mode = True
        from_attributes = True
