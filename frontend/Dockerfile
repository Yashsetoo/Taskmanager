# ── Stage 1: Build ──────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .

# Set build-time env for API URL
ARG NEXT_PUBLIC_API_URL=http://localhost:8000
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build

# ── Stage 2: Run ────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy only the standalone output — nothing else needed
COPY --from=builder /app/.next/standalone .
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

USER appuser
EXPOSE 3000

CMD ["node", "server.js"]
