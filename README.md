# Task Manager — 3-Tier Application

A minimal task management app built with Next.js 14, FastAPI, and PostgreSQL.

## Stack

| Tier     | Technology                               |
|----------|------------------------------------------|
| Frontend | Next.js 14 (App Router, TypeScript, Tailwind CSS) |
| Backend  | Python FastAPI + SQLAlchemy async + Alembic |
| Database | PostgreSQL 16                            |

---

## Quick Start (Docker Compose)

```bash
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

---

## Local Development

### 1. Database

```bash
# Start only postgres
docker compose up db -d
```

### 2. Backend

```bash
cd backend

# Create virtualenv
python -m venv .venv && source .venv/bin/activate

# Install deps
pip install -r requirements.txt

# Configure env
cp .env.example .env
# Edit .env if needed

# Run migrations
alembic upgrade head

# Start dev server
uvicorn app.main:app --reload --port 8000
```

### 3. Frontend

```bash
cd frontend

npm install

cp .env.local.example .env.local
# Edit NEXT_PUBLIC_API_URL if backend is not on localhost:8000

npm run dev
```

---

## API Reference

| Method | Path               | Description              |
|--------|--------------------|--------------------------|
| GET    | /api/health        | Health check             |
| GET    | /api/tasks         | List tasks (?status=)    |
| GET    | /api/tasks/{id}    | Get single task          |
| POST   | /api/tasks         | Create task              |
| PUT    | /api/tasks/{id}    | Update task              |
| DELETE | /api/tasks/{id}    | Delete task              |

### Create Task

```json
POST /api/tasks
{ "title": "My task", "description": "Optional details" }
```

### Update Task

```json
PUT /api/tasks/1
{ "status": "in_progress" }
```

Status values: `todo` | `in_progress` | `done`

---

## Environment Variables

### Backend

| Variable      | Default     | Description         |
|---------------|-------------|---------------------|
| DB_HOST       | localhost   | PostgreSQL host     |
| DB_PORT       | 5432        | PostgreSQL port     |
| DB_NAME       | tasks_db    | Database name       |
| DB_USER       | postgres    | Database user       |
| DB_PASSWORD   | postgres    | Database password   |

### Frontend

| Variable              | Default                  | Description     |
|-----------------------|--------------------------|-----------------|
| NEXT_PUBLIC_API_URL   | http://localhost:8000    | Backend API URL |

---

## Project Structure

```
project/
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   ├── alembic.ini
│   ├── requirements.txt
│   ├── .env.example
│   ├── alembic/
│   │   ├── env.py
│   │   └── versions/
│   │       └── 0001_create_tasks.py
│   └── app/
│       ├── main.py          # FastAPI app + CORS
│       ├── config.py        # Settings from env vars
│       ├── database.py      # Async SQLAlchemy engine
│       ├── models/
│       │   └── task.py      # Task ORM model
│       ├── schemas/
│       │   └── task.py      # Pydantic v2 schemas
│       └── routes/
│           └── tasks.py     # All /api/tasks routes
└── frontend/
    ├── Dockerfile
    ├── next.config.js       # output: 'standalone'
    ├── tailwind.config.js
    ├── .env.local.example
    └── src/
        ├── app/
        │   ├── layout.tsx
        │   ├── page.tsx     # Main task manager page
        │   └── globals.css
        ├── components/
        │   ├── TaskCard.tsx        # Inline edit, status, delete
        │   ├── CreateTaskForm.tsx  # New task form
        │   └── StatusBadge.tsx     # Colour-coded badge
        └── lib/
            └── api.ts       # Typed API client
```
