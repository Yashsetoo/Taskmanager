# ── Stage 1: Build Frontend ────────────────────────────────
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ .
# Setting this to empty makes API calls relative to the current domain (perfect for same-server hosting)
ENV NEXT_PUBLIC_API_URL=""
RUN npm run build

# ── Stage 2: Build Backend & Serve ────────────────────────
FROM python:3.11-slim
WORKDIR /app

# Create a non-root user
RUN adduser --disabled-password --gecos '' appuser

# Install curl for healthchecks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Install backend dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ .

# Copy compiled frontend from Stage 1 into the 'static' directory
COPY --from=frontend-builder /app/frontend/out ./static

USER appuser

# Expose Render default dynamic port placeholder
EXPOSE 10000

# Run migrations and start server, binding to the PORT injected by Render
CMD ["sh", "-c", "alembic upgrade head && uvicorn main:app --host 0.0.0.0 --port ${PORT:-10000}"]
