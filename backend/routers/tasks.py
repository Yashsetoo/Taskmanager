from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from models import Task
from schemas import TaskCreate, TaskResponse, TaskUpdate

router = APIRouter(prefix="/api/tasks", tags=["tasks"])

@router.get("", response_model=List[TaskResponse])
async def list_tasks(
    status: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(Task).order_by(Task.created_at.desc())
    if status:
        stmt = stmt.where(Task.status == status)
    result = await db.execute(stmt)
    return result.scalars().all()

@router.get("/{task_id}", response_model=TaskResponse)
async def get_task(task_id: int, db: AsyncSession = Depends(get_db)):
    task = await db.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.post("", response_model=TaskResponse, status_code=201)
async def create_task(payload: TaskCreate, db: AsyncSession = Depends(get_db)):
    task = Task(title=payload.title, description=payload.description)
    db.add(task)
    await db.commit()
    await db.refresh(task)
    return task

@router.put("/{task_id}", response_model=TaskResponse)
async def update_task(
    task_id: int, payload: TaskUpdate, db: AsyncSession = Depends(get_db)
):
    task = await db.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(task, field, value)
    await db.commit()
    await db.refresh(task)
    return task

@router.delete("/{task_id}", status_code=204)
async def delete_task(task_id: int, db: AsyncSession = Depends(get_db)):
    task = await db.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    await db.delete(task)
    await db.commit()
