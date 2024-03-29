from fastapi import FastAPI
from app.routers.sensor import router as sensor_router
from app.routers.prediction import router as prediction_router

app = FastAPI()

app.include_router(sensor.router, prefix="/sensors", tags=["Sensors"])
app.include_router(prediction.router, prefix="/predictions", tags=["Predictions"])
@app.get("/")
async def root():
    return {"message": "Welcome to the Maintenance Dashboard API"}
