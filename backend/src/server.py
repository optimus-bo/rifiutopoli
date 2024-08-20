from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from starlette.responses import Response
from pathlib import Path
from .rifiuti.rifiuto_router import router_rifiuti
from .raccolte.raccolte_router import router_raccolte
from .immagini.immagini_router import router_immagini
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
app.include_router(router_immagini, prefix="/api", tags=["immagini"])


# TODO: sta roba fa riscritta per bene
BUILD_DIR = "../frontend/build"
static_dir = Path(BUILD_DIR) / "static"
# solo se la cartella esiste per evitare problemi con i test
if static_dir.exists():
    # serve del frontend dalla cartella build
    app.mount("/static", StaticFiles(directory=f"{BUILD_DIR}/static"), name="static")


@app.get("/favicon.ico", response_class=FileResponse)
async def get_icon():
    return FileResponse(f"{BUILD_DIR}/favicon.ico")


@app.get("/logo192.png", response_class=FileResponse)
async def get_icon():
    return FileResponse(f"{BUILD_DIR}/logo192.png")


@app.get("/logo512.png", response_class=FileResponse)
async def get_icon():
    return FileResponse(f"{BUILD_DIR}/logo512.png")


@app.get("/manifest.json", response_class=FileResponse)
async def get_icon():
    return FileResponse(f"{BUILD_DIR}/manifest.json")


@app.get("/service-worker.js", response_class=FileResponse)
async def get_icon():
    return FileResponse(f"{BUILD_DIR}/service-worker.js")


@app.get("/service-worker.js.map", response_class=FileResponse)
async def get_icon():
    return FileResponse(f"{BUILD_DIR}/service-worker.js.map")


@app.get("/robots.txt", response_class=FileResponse)
async def get_icon():
    return FileResponse(f"{BUILD_DIR}/favicon.ico")


@app.get("/{full_path:path}", response_class=HTMLResponse)
async def read_index(full_path: str):
    index_path = Path(f"{BUILD_DIR}/index.html")
    return HTMLResponse(content=index_path.read_text(), status_code=200)
