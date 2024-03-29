# ml_model/predict.py
import joblib
import pandas as pd

def load_model(model_path):
    # Load the trained model
    return joblib.load(model_path)

def make_prediction(model, data_for_prediction):
    # Preprocess data if needed
    # Make predictions with the model
    prediction = model.predict(data_for_prediction)
    return prediction
