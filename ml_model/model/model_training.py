import pandas as pd
from .data_preprocessing import load_and_preprocess_data
from imblearn.over_sampling import SMOTE
import xgboost as xgb
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
import joblib  # For saving the model

def mark_failures(sensor_data, failure_data):
    sensor_data['failure_within_48h'] = 0
    for index, row in failure_data.iterrows():
        start_time = row['datetime'] - pd.Timedelta(hours=48)
        end_time = row['datetime']
        machine_id = row['machineID']
        sensor_data.loc[(sensor_data.index > start_time) & (sensor_data.index <= end_time) & (sensor_data['machineID'] == machine_id), 'failure_within_48h'] = 1
    return sensor_data

def train_model(sensor_data_path, failure_data_path):
    sensor_data, failure_data = load_and_preprocess_data(sensor_data_path, failure_data_path)
    sensor_data = mark_failures(sensor_data, failure_data)

    split_date = sensor_data.index.max() - pd.Timedelta(days=365 * 0.2)
    train_data = sensor_data[sensor_data.index < split_date]
    test_data = sensor_data[sensor_data.index >= split_date]

    X_train = train_data.drop(['failure_within_48h', 'machineID'], axis=1)
    y_train = train_data['failure_within_48h']
    X_test = test_data.drop(['failure_within_48h', 'machineID'], axis=1)
    y_test = test_data['failure_within_48h']

    # Apply SMOTE to balance the training data
    smote = SMOTE(random_state=42)
    X_train_resampled, y_train_resampled = smote.fit_resample(X_train, y_train)

    # Train the model using XGBoost
    dtrain_resampled = xgb.DMatrix(X_train_resampled, label=y_train_resampled)
    dtest = xgb.DMatrix(X_test, label=y_test)

    params = {
        'max_depth': 6,
        'eta': 0.3,
        'objective': 'binary:logistic',
        'eval_metric': 'auc',
        'nthread': 4
    }

    num_boost_round = 100
    bst_resampled = xgb.train(params, dtrain_resampled, num_boost_round, evals=[(dtest, 'test')], early_stopping_rounds=10)

    # Save the trained model to a file
    joblib.dump(bst_resampled, 'trained_models/xgb_model.pkl')

    return bst_resampled