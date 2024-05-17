// src/api.js
export const BASE_URL = 'http://localhost:8000'; // Your backend base URL

export const ENDPOINTS = {
  VOLT: (machine_id, date_time) => `${BASE_URL}/telemetry/${machine_id}/${date_time}/volt`,
  ROTATE: (machine_id, date_time) => `${BASE_URL}/telemetry/${machine_id}/${date_time}/rotate`,
  PRESSURE: (machine_id, date_time) => `${BASE_URL}/telemetry/${machine_id}/${date_time}/pressure`,
  VIBRATION: (machine_id, date_time) => `${BASE_URL}/telemetry/${machine_id}/${date_time}/vibration`,
  TELEMETRY_ALL: `${BASE_URL}/telemetry/all`,
  // Add other endpoints as needed
};
