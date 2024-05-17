from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from schemas.sensor_schemas import ErrorModel, FailureModel, MachineModel, MaintenanceModel, TelemetryModel
from database import get_db, Base, engine
from models import Error, Failure, Machine, Maintenance, Telemetry
from datetime import datetime

import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("uvicorn")

Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/errors/all")
def get_all_errors(db: Session = Depends(get_db)):
    errors = db.query(Error).all()
    if not errors:
        raise HTTPException(status_code=404, detail="No errors found")
    
    response = [{"datetime": error.datetime, "machineID": int(error.machineID), "errorID": error.errorID} for error in errors]
    return response

@app.get("/failures/all")
def get_all_failures(db: Session = Depends(get_db)):
    failures = db.query(Failure).all()
    if not failures:
        raise HTTPException(status_code=404, detail="No failures found")
    
    response = [{"datetime": failure.datetime, "machineID": int(failure.machineID), "failure": failure.failure} for failure in failures]
    return response

@app.get("/machines/all")
def get_all_machines(db: Session = Depends(get_db)):
    machines = db.query(Machine).all()
    if not machines:
        raise HTTPException(status_code=404, detail="No machines found")
    
    response = [{"machineID": int(machine.machineID), "model": machine.model, "age": int(machine.age)} for machine in machines]
    return response

@app.get("/maintenance/all")
def get_all_maintenance(db: Session = Depends(get_db)):
    maintenances = db.query(Maintenance).all()
    if not maintenances:
        raise HTTPException(status_code=404, detail="No maintenance records found")
    
    response = [{"datetime": maintenance.datetime, "machineID": int(maintenance.machineID), "comp": maintenance.comp} for maintenance in maintenances]
    return response

@app.get("/telemetry/all")
def get_all_telemetry(db: Session = Depends(get_db)):
    telemetries = db.query(Telemetry).all()
    if not telemetries:
        raise HTTPException(status_code=404, detail="No telemetry records found")
    
    response = [{"datetime": telemetry.datetime, "machineID": int(telemetry.machineID), "volt": float(telemetry.volt), "rotate": float(telemetry.rotate), "pressure": float(telemetry.pressure), "vibration": float(telemetry.vibration)} for telemetry in telemetries]
    return response

@app.get("/failures/{machine_id}")
def get_failures_by_machine_id(machine_id: int, db: Session = Depends(get_db)):
    failures = db.query(Failure).filter(Failure.machineID == machine_id).all()
    
    if not failures:
        raise HTTPException(status_code=404, detail="No failures found for the specified machine ID")
    
    response = [{"datetime": failure.datetime, "failure": failure.failure} for failure in failures]
    return response


@app.get("/errors/{machine_id}")
def get_errors_by_machine_id(machine_id: int, db: Session = Depends(get_db)):
    errors = db.query(Error).filter(Error.machineID == machine_id).all()
    
    if not errors:
        raise HTTPException(status_code=404, detail="No errors found for the specified machine ID")
    
    response = [{"datetime": error.datetime, "errorID": error.errorID} for error in errors]
    return response

@app.get("/telemetry/{machine_id}/{date_time}/volt")
def get_volt_by_machine_id_and_datetime(machine_id: int, date_time: str, db: Session = Depends(get_db)):
    try:
        datetime_obj = datetime.strptime(date_time, '%Y-%m-%d %H:%M:%S')
    except ValueError:
        raise HTTPException(status_code=400, detail="Incorrect date format. Please use YYYY-MM-DD HH:MM:SS")
    
    telemetry = db.query(Telemetry).filter(Telemetry.machineID == machine_id, Telemetry.datetime == datetime_obj).first()
    if telemetry is None:
        raise HTTPException(status_code=404, detail="Telemetry not found")
    return {"volt": float(telemetry.volt)}

@app.get("/telemetry/{machine_id}/{date_time}/rotate")
def get_rotate_by_machine_id_and_datetime(machine_id: int, date_time: str, db: Session = Depends(get_db)):
    try:
        datetime_obj = datetime.strptime(date_time, '%Y-%m-%d %H:%M:%S')
    except ValueError:
        raise HTTPException(status_code=400, detail="Incorrect date format. Please use YYYY-MM-DD HH:MM:SS")
    
    telemetry = db.query(Telemetry).filter(Telemetry.machineID == machine_id, Telemetry.datetime == datetime_obj).first()
    if telemetry is None:
        raise HTTPException(status_code=404, detail="Telemetry not found")
    return {"rotate": float(telemetry.rotate)}

@app.get("/telemetry/{machine_id}/{date_time}/pressure")
def get_pressure_by_machine_id_and_datetime(machine_id: int, date_time: str, db: Session = Depends(get_db)):
    try:
        datetime_obj = datetime.strptime(date_time, '%Y-%m-%d %H:%M:%S')
    except ValueError:
        raise HTTPException(status_code=400, detail="Incorrect date format. Please use YYYY-MM-DD HH:MM:SS")
    
    telemetry = db.query(Telemetry).filter(Telemetry.machineID == machine_id, Telemetry.datetime == datetime_obj).first()
    if telemetry is None:
        raise HTTPException(status_code=404, detail="Telemetry not found")
    return {"pressure": float(telemetry.pressure)}

@app.get("/telemetry/{machine_id}/{date_time}/vibration")
def get_vibration_by_machine_id_and_datetime(machine_id: int, date_time: str, db: Session = Depends(get_db)):
    try:
        datetime_obj = datetime.strptime(date_time, '%Y-%m-%d %H:%M:%S')
    except ValueError:
        raise HTTPException(status_code=400, detail="Incorrect date format. Please use YYYY-MM-DD HH:MM:SS")
    
    telemetry = db.query(Telemetry).filter(Telemetry.machineID == machine_id, Telemetry.datetime == datetime_obj).first()
    if telemetry is None:
        raise HTTPException(status_code=404, detail="Telemetry not found")
    return {"vibration": float(telemetry.vibration)}

@app.get("/machines/{machine_id}/age")
def get_machine_by_age(machine_id: int, db: Session = Depends(get_db)):
    machine = db.query(Machine).filter(Machine.machineID == machine_id).first()
    if machine is not None:
        return {"age": int(machine.age)}
    raise HTTPException(status_code=404, detail="Machine not found")

@app.get("/machines/{machine_id}/model")
def get_machine_by_model(machine_id: int, db: Session = Depends(get_db)):
    machine = db.query(Machine).filter(Machine.machineID == machine_id).first()
    if machine is not None:
        return {"model": str(machine.model)}
    raise HTTPException(status_code=404, detail="Machine not found")

@app.get("/")
async def root():
    return {"message": "Welcome to the Maintenance Dashboard API"}