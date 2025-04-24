import pandas as pd
import joblib
from sklearn.ensemble import IsolationForest

# ---- Load Processed Blockchain Data ----
file_path = "processed_blockchain_data.csv"
df = pd.read_csv(file_path)

# ---- Select Features for Anomaly Detection ----
features = ["value_eth", "gas_used", "gas_price", "predicted_risk_score"]
df = df[features]

# ---- Train Isolation Forest for Fraud Detection ----
fraud_detector = IsolationForest(n_estimators=100, contamination=0.02, random_state=42)
df["fraud_score"] = fraud_detector.fit_predict(df)

# ---- Flag Anomalies (Fraud: -1, Normal: 1) ----
df["fraud_label"] = df["fraud_score"].apply(lambda x: "Fraud" if x == -1 else "Legit")

# ---- Save Fraud Analysis Results ----
df.to_csv("fraud_detection_results.csv", index=False)
joblib.dump(fraud_detector, "fraud_model.pkl")
print("✅ Fraud Detection Model saved as 'fraud_model.pkl'")
print("✅ Fraud Analysis saved as 'fraud_detection_results.csv'")

# ---- Summary ----
fraudulent_txns = df[df["fraud_label"] == "Fraud"].shape[0]
legit_txns = df[df["fraud_label"] == "Legit"].shape[0]

print(f"⚠️ Fraudulent Transactions Detected: {fraudulent_txns}")
print(f"✅ Legit Transactions: {legit_txns}")
