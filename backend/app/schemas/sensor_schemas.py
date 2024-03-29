from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class SensorDataBaseSchema(BaseModel):
    timestamp: datetime
    value: float
    status: Optional[str] = None

class SensorDataSchema(SensorDataBaseSchema):
    id: int

class SensorDataCreateSchema(SensorDataBaseSchema):
    pass

class PredictionSchema(BaseModel):
    prediction: int