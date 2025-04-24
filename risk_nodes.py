import pandas as pd
import joblib
import numpy as np

# ---- Load Processed Dataset ----
file_path = "processed_blockchain_data.csv"
df = pd.read_csv(file_path)

# ---- Load Trained AI Model ----
model = joblib.load("risk_score_model.pkl")

# ---- Predict Risk Scores for Nodes ----
df["predicted_risk_score"] = model.predict(df.drop(columns=["risk_score"]))

# ---- Define Risk Levels ----
def categorize_risk(score):
    if score > 75:
        return "High Risk (Red)"
    elif score > 50:
        return "Medium Risk (Yellow)"
    else:
        return "Low Risk (Green)"

df["risk_category"] = df["predicted_risk_score"].apply(categorize_risk)

# ---- Save Risk Categorization ----
df.to_csv("node_risk_analysis.csv", index=False)
print("✅ Node Risk Analysis saved as 'node_risk_analysis.csv'")

# ---- Summary ----
high_risk_nodes = df[df["risk_category"] == "High Risk (Red)"].shape[0]
medium_risk_nodes = df[df["risk_category"] == "Medium Risk (Yellow)"].shape[0]
low_risk_nodes = df[df["risk_category"] == "Low Risk (Green)"].shape[0]

print(f"🔴 High Risk Nodes: {high_risk_nodes}")
print(f"🟡 Medium Risk Nodes: {medium_risk_nodes}")
print(f"🟢 Low Risk Nodes: {low_risk_nodes}")
