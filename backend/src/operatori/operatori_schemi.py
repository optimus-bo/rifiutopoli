from typing import Optional
from pydantic import BaseModel
from sqlalchemy import String, ForeignKey, Integer, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from ..db import BaseEntity


class Operatore(BaseEntity):
    __tablename__ = "operatore"
    id: Mapped[int] = mapped_column(primary_key=True)
    nome: Mapped[str] = mapped_column(String, nullable=True)


class OperatoreRead(BaseModel):
    id: int
    nome: str

    class Config:
        orm_mode = True
        from_attributes = True


class OperatoreCreate(BaseModel):
    nome: Optional[str] = None

    class Config:
        orm_mode = True
        from_attributes = True
