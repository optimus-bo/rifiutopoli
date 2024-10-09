from datetime import datetime
from pydantic import BaseModel
from sqlalchemy import DateTime, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from ..db import BaseEntity
from ..rifiuti.rifiuto_schemi import Rifiuto, RifiutoRead
from ..operatori.operatori_schemi import Operatore


class Raccolta(BaseEntity):
    __tablename__ = "raccolta"
    id: Mapped[int] = mapped_column(primary_key=True)
    codice_eer: Mapped[str] = mapped_column(ForeignKey("rifiuto.codice_eer"))
    id_operatore: Mapped[int] = mapped_column(ForeignKey("operatore.id"))
    contenitori: Mapped[int] = mapped_column(Integer)
    data: Mapped[datetime] = mapped_column(DateTime)

    rifiuto: Mapped["Rifiuto"] = relationship("Rifiuto")
    operatore: Mapped["Operatore"] = relationship("Operatore")


class RaccoltaRead(BaseModel):
    id: int
    codice_eer: str
    contenitori: int
    data: datetime
    # TODO: questo non viene ritornato da fixare
    rifiuto: RifiutoRead

    class Config:
        orm_mode = True
        from_attributes = True


class RaccoltaCreate(BaseModel):
    codice_eer: str
    contenitori: int
    id_operatore: int

    class Config:
        orm_mode = True
        from_attributes = True
