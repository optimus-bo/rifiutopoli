from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .rifiuti.rifiuto_router import router_rifiuti
from .db import crea_tabelle


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


async def startup_event():
    await crea_tabelle()


app.add_event_handler("startup", startup_event)

app.include_router(router_rifiuti, prefix="/api", tags=["rifiuti"])
