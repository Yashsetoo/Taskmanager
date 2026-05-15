from datetime import datetime
from typing import Literal, Optional
from pydantic import BaseModel, ConfigDict

TaskStatus = Literal["todo", "in_progress", "done"]

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[TaskStatus] = None

class TaskResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    description: Optional[str] = None
    status: str
    created_at: datetime

class HealthResponse(BaseModel):
    status: str
