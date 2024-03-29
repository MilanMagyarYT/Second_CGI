from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

# Import necessary functions from the ML model directory
from ml_model.predict import make_prediction, load_model

# Define the router
router = APIRouter()

# Pydantic model for incoming sensor data
class SensorData(BaseModel):
    volt: float
    rotate: float
    pressure: float
    vibration: float
    # Add any other sensor fields here

# Pydantic model for prediction output
class PredictionResult(BaseModel):
    prediction: int

# Load the model outside of the endpoint to avoid reloading it on each request
model = load_model('trained_models/xgb_model.pkl')

@router.post("/predict", response_model=PredictionResult)
async def predict_failure(sensor_data: SensorData):
    # Prepare the incoming sensor data for the model
    data_for_prediction = pd.DataFrame([sensor_data.dict()])

    # Make a prediction
    prediction = make_prediction(model, data_for_prediction)
    
    # Return the prediction as a response
    return PredictionResult(prediction=prediction)

