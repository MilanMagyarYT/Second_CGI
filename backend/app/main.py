from fastapi import FastAPI
from app.routers.sensor import router as sensor_router

app = FastAPI()

app.include_router(sensor_router, prefix="/sensors", tags=["Sensors"])

@app.get("/")
async def root():
    return {"message": "Welcome to the Maintenance Dashboard API"}
