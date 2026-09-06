from fastapi import FastAPI

app = FastAPI(
    title="LandLens AI API",
    description="Land research and policy intelligence platform.",
    version="0.1.0",
)


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "LandLens AI API",
    }