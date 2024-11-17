from datetime import datetime
from pydantic import BaseModel
from sqlalchemy import DateTime, ForeignKey, Integer, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from ..db import BaseEntity
from ..rifiuti.rifiuto_schemi import Rifiuto, RifiutoRead


class Raccolta(BaseEntity):
    __tablename__ = "raccolta"
    id: Mapped[int] = mapped_column(primary_key=True)
    codice_eer: Mapped[str] = mapped_column(ForeignKey("rifiuto.codice_eer"))
    quantita: Mapped[int] = mapped_column(Integer)
    data: Mapped[datetime] = mapped_column(DateTime)
    esportato: Mapped[bool] = mapped_column(Boolean, nullable=False)

    rifiuto: Mapped["Rifiuto"] = relationship("Rifiuto")


class RaccoltaRead(BaseModel):
    id: int
    codice_eer: str
    quantita: int
    data: datetime
    esportato: bool
    # TODO: questo non viene ritornato da fixare
    rifiuto: RifiutoRead

    class Config:
        orm_mode = True
        from_attributes = True


class RaccoltaCreate(BaseModel):
    codice_eer: str
    quantita: int

    class Config:
        orm_mode = True
        from_attributes = True
