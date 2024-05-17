# Use an official lightweight Python image.
FROM python:3.9-slim

# Set environment variables to reduce Python package issues and log messages
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container to /app
WORKDIR /app

# Install system dependencies required for common Python packages
RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc libpq-dev g++ unixodbc-dev curl gnupg \
    && curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
    && curl https://packages.microsoft.com/config/debian/10/prod.list > /etc/apt/sources.list.d/mssql-release.list \
    && apt-get update \
    && ACCEPT_EULA=Y apt-get install -y msodbcsql17 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY ./backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend directory contents into the container at /app
COPY ./backend/app/ ./

# Command to run the Uvicorn server, noting the directory change
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
# Expose the port the app runs on
EXPOSE 8000
