@echo off
echo ===================================================
echo   SENTINELX SECURECHAIN GOVTRUST INITIALIZER
echo ===================================================

echo [1/5] Starting Infrastructure (Docker)...
docker compose up -d

echo [2/5] Initializing Backend...
cd backend
if not exist .env copy ..\.env.example .env
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)
call venv\Scripts\activate.bat
call pip install -r requirements.txt

echo [3/5] Initializing Frontend...
cd ../frontend
call npm install

echo [4/5] Initializing Blockchain...
echo Ganache is running via Docker Compose.

echo [5/5] Launching Platform...
cd ..
start cmd /k "cd backend && call venv\Scripts\activate.bat && set PYTHONPATH=.. && uvicorn main:app --reload --port 8000"
start cmd /k "cd frontend && npm run dev"

echo ===================================================
echo Platform is starting!
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo ===================================================
pause
