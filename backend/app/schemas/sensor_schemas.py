from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class ErrorModel(BaseModel):
    id: str
    datetime: datetime
    machineID: int
    errorID: str

    class Config:
        from_attributes = True
        json_encoders = {
            datetime: lambda v: v.timestamp()
        }

class FailureModel(BaseModel):
    id: str
    datetime: datetime
    machineID: int
    failure: str

    class Config:
        from_attributes = True
        json_encoders = {
            datetime: lambda v: v.timestamp()
        }


class MachineModel(BaseModel):
    id: str
    machineID: int
    model: str
    age: int

    class Config:
        from_attributes = True

class MaintenanceModel(BaseModel):
    id: str
    datetime: datetime
    machineID: int
    comp: str
    
    class Config:
        from_attributes = True
        json_encoders = {
            datetime: lambda v: v.timestamp()
        }

class TelemetryModel(BaseModel):
    id: str
    datetime: datetime
    machineID: int
    volt: Optional[float]
    rotate: Optional[float]
    pressure: Optional[float]
    vibration: Optional[float]

    class Config:
        from_attributes = True
        json_encoders = {
            datetime: lambda v: v.timestamp()
        }
