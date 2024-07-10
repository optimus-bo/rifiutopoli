from typing import Optional
from pydantic import BaseModel


class RifiutoRead(BaseModel):
    codice_cer: str
    nome: str

    class Config:
        orm_mode = True
        from_attributes = True


class RifiutoUpdate(BaseModel):
    nome: Optional[str] = None

    class Config:
        orm_mode = True
        from_attributes = True
