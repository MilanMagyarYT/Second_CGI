import pandas as pd

def load_and_preprocess_data(sensor_data_path, failure_data_path):
    sensor_data = pd.read_csv('C:\Users\User\Desktop\CGI\cgi_maintanencedashboard\dataset\telemetry.csv')
    failure_data = pd.read_csv('C:\Users\User\Desktop\CGI\cgi_maintanencedashboard\dataset\failure.csv')

    sensor_data['datetime'] = pd.to_datetime(sensor_data['datetime'])
    failure_data['datetime'] = pd.to_datetime(failure_data['datetime'])

    sensor_data.set_index('datetime', inplace=True)
    sensor_data.sort_index(inplace=True)

    window_size = '24H'
    for column in ['volt', 'rotate', 'pressure', 'vibration']:
        sensor_data[f'{column}_mean'] = sensor_data.groupby('machineID')[column].transform(lambda x: x.rolling(window_size).mean())
        sensor_data[f'{column}_std'] = sensor_data.groupby('machineID')[column].transform(lambda x: x.rolling(window_size).std())

    for column in ['volt_std', 'rotate_std', 'pressure_std', 'vibration_std']:
        avg_std = sensor_data[column].mean()
        sensor_data[column].fillna(avg_std, inplace=True)

    return sensor_data, failure_data
