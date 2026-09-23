from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine
from routers import auth

# Creates tables on startup if they don't exist (fine for dev; use Alembic later for prod)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="LandLens AI API",
    description="Land research and policy intelligence platform.",
    version="0.3.0",
)

# Allow your frontend dev server to call this API (tighten origin before production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "LandLens AI API",
    }
