from fastapi import APIRouter, Depends
from app.schemas.sensor_schemas import SensorDataSchema, SensorDataCreateSchema
from app.dependencies import get_nosql_db

router = APIRouter()

@router.post("/", response_model=SensorDataSchema)
async def create_sensor_data(sensor_data: SensorDataCreateSchema, db=Depends(get_nosql_db)):
    # Logic here
    pass

@router.get("/{sensor_id}", response_model=SensorDataSchema)
async def get_sensor_data(sensor_id: int, db=Depends(get_nosql_db)):
    # Logic here
    pass
