from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .rifiuti.rifiuto_router import router_rifiuti
from .raccolte.raccolte_router import router_raccolte
from .db import crea_tabelle


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:44444",
        "https://localhost:3000",
        "https://localhost:44444",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:44444",
        "https://127.0.0.1:3000",
        "https://127.0.0.1:44444",
        "https://iaisydanieletarek.ddns.net:44444",
        "https://iaisydanieletarek.ddns.net",
        "http://iaisydanieletarek.ddns.net:44444",
        "http://iaisydanieletarek.ddns.net",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


async def startup_event():
    await crea_tabelle()


app.add_event_handler("startup", startup_event)

app.include_router(router_rifiuti, prefix="/api", tags=["rifiuti"])
app.include_router(router_raccolte, prefix="/api", tags=["raccolte"])
