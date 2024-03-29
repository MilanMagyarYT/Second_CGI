from fastapi import APIRouter, HTTPException, Query
from app.models import SensorData  # ORM model for SensorData
from app.dependencies import get_nosql_db
from datetime import datetime

router = APIRouter()

# Endpoint to get sensor data by machineID
@router.get("/data/{machine_id}")
async def get_data_by_machine_id(machine_id: int, db=Depends(get_nosql_db)):
    data = await db["V1"].find({"machineID": machine_id}).to_list(1000)
    if not data:
        raise HTTPException(status_code=404, detail="No data found for given machine ID")
    return data

# Endpoint to get sensor data by machineID and a specific time
@router.get("/data/{machine_id}/{timestamp}")
async def get_data_by_machine_id_and_time(machine_id: int, timestamp: datetime, db=Depends(get_nosql_db)):
    data = await db["V1"].find_one({"machineID": machine_id, "datetime": timestamp})
    if not data:
        raise HTTPException(status_code=404, detail="No data found for given machine ID and timestamp")
    return data

# Add more endpoints as needed based on the model you've provided
