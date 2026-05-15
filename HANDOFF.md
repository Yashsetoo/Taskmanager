### Project Structure
.
├── AI_AGENT_LOG.md
├── HANDOFF.md
├── README.md
├── backend
│   ├── Dockerfile
│   ├── alembic
│   │   ├── env.py
│   │   ├── script.py.mako
│   │   └── versions
│   │       └── 0001_create_tasks.py
│   ├── alembic.ini
│   ├── app
│   │   ├── __init__.py
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── models
│   │   │   ├── __init__.py
│   │   │   └── task.py
│   │   ├── routes
│   │   │   ├── __init__.py
│   │   │   └── tasks.py
│   │   └── schemas
│   │       ├── __init__.py
│   │       └── task.py
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   ├── requirements.txt
│   ├── routers
│   │   └── tasks.py
│   └── schemas.py
├── docker-compose.yml
├── fetch-params.sh
├── frontend
│   ├── Dockerfile
│   ├── next-env.d.ts
│   ├── next.config.js
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── public
│   ├── src
│   │   ├── app
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components
│   │   │   ├── CreateTaskForm.tsx
│   │   │   ├── StatusBadge.tsx
│   │   │   └── TaskCard.tsx
│   │   └── lib
│   │       └── api.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
└── nginx
    └── taskapp.conf

15 directories, 42 files

### Active Environment

### Recent Activity
 1580  docker images
 1581  docker rmi wraft-backend:latest
 1582  docker ps 
 1583  docker ps -a
 1584  docker kill d20040870b32 300396d5fab7 54ccb5e868fd
 1585  clear
 1586  docker ps 
 1587  clear
 1588  docker run -d --name host_postgres -p 5432:5432 -e POSTGRES_DB=tasks_db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres postgres:15-alpine
 1589  docker compose exec backend alembic upgrade head
 1590  clear
 1591  echo "### Project Structure" > HANDOFF.md
 1592  tree -I 'node_modules|.git|venv|__pycache__' >> HANDOFF.md
 1593  apt intall tree
 1594  apt install tree
 1595  tree -I 'node_modules|.git|venv|__pycache__' >> HANDOFF.md
 1596  echo -e "\n### Active Environment" >> HANDOFF.md
 1597  env | grep -E 'AWS_|DOCKER_|JENKINS_' | sed 's/=.*/=******/' >> HANDOFF.md
 1598  echo -e "\n### Recent Activity" >> HANDOFF.md
 1599  history | tail -n 20 >> HANDOFF.md
