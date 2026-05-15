from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.tasks import router as tasks_router
from app.schemas.task import HealthResponse

app = FastAPI(title="Task Manager API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks_router)


@app.get("/api/health", response_model=HealthResponse)
async def health():
    return {"status": "ok"}
