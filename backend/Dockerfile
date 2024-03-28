# Stage 1: Install dependencies
FROM python:3.9-slim AS build
WORKDIR /backend
COPY backend/requirements.txt . 
 # Assuming the Dockerfile is at the root and the requirements file is in the backend directory
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/app ./app 
 # Copy your FastAPI application code into the image

# Stage 2: Run the application
FROM python:3.9-slim
WORKDIR /backend
COPY --from=build /backend /backend
EXPOSE 8000  
# Expose the correct port for the application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"] 
 # Start the Uvicorn server