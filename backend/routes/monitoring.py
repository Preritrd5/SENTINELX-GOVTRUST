from fastapi import APIRouter
import random
import time

router = APIRouter()

start_time = time.time()

@router.get("/health")
def get_system_health():
    uptime_seconds = int(time.time() - start_time)
    hours, remainder = divmod(uptime_seconds, 3600)
    minutes, seconds = divmod(remainder, 60)
    
    return {
        "status": "Operational",
        "uptime": f"{hours}h {minutes}m {seconds}s",
        "active_nodes": random.randint(45, 55),
        "threat_level": "Low",
        "tps": random.randint(100, 300), # Transactions per second
        "cpu_usage": f"{random.randint(20, 60)}%",
        "memory_usage": f"{random.randint(40, 75)}%"
    }
