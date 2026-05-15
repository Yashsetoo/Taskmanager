from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os
from routers.tasks import router as tasks_router
from schemas import HealthResponse

app = FastAPI(title="Task Manager API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Routes
app.include_router(tasks_router)

@app.get("/api/health", response_model=HealthResponse)
async def health():
    return {"status": "ok"}

# Serve the static frontend SPA if the directory exists
if os.path.isdir("static"):
    app.mount("/", StaticFiles(directory="static", html=True), name="static")

    # Fallback for client-side routing in Next.js
    @app.exception_handler(404)
    async def custom_404_handler(request, __):
        return FileResponse('static/index.html')

