import numpy as np
from sklearn.ensemble import RandomForestClassifier
import pickle
import os

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(CURRENT_DIR, "rf_model.pkl")

def train_verification_model():
    # Dummy data for training: [income, location_encoded, transaction_frequency]
    # 0 = safe, 1 = flagged
    X_train = np.array([
        [50000, 1, 5],
        [120000, 2, 2],
        [30000, 1, 10],
        [200000, 3, 50], # high risk anomaly
        [40000, 2, 8],
        [80000, 1, 4],
        [15000, 3, 100], # high risk anomaly
        [60000, 1, 6],
    ])
    y_train = np.array([0, 0, 0, 1, 0, 0, 1, 0])

    clf = RandomForestClassifier(n_estimators=100, random_state=42)
    clf.fit(X_train, y_train)

    with open(MODEL_PATH, "wb") as f:
        pickle.dump(clf, f)

def get_risk_score(income: float, location_str: str, tx_freq: int) -> dict:
    if not os.path.exists(MODEL_PATH):
        train_verification_model()
        
    with open(MODEL_PATH, "rb") as f:
        clf = pickle.load(f)
        
    # simple encoding for location
    loc_encoded = len(location_str) % 3 + 1
    
    # predict probability of being flagged (class 1)
    proba = clf.predict_proba([[income, loc_encoded, tx_freq]])[0]
    risk_score = proba[1] * 100
    
    level = "LOW"
    if risk_score > 70:
        level = "HIGH"
    elif risk_score > 30:
        level = "MEDIUM"
        
    return {"risk_score": round(risk_score, 2), "risk_level": level}
