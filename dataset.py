import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder

# ---- Load Dataset ----
file_path = "C:\\Users\\tosou\\OneDrive\\Desktop\\datasc\\blockchain_transactions.xlsx"
df = pd.read_excel(file_path)

# ---- Handle Missing Data ----
df.dropna(inplace=True)

# ---- Convert Timestamp to Numeric (Unix Time) ----
df["timestamp"] = pd.to_datetime(df["timestamp"]).astype('int64') // 10**9

# ---- Encode Categorical Variables ----
label_encoder = LabelEncoder()
df["key_type"] = label_encoder.fit_transform(df["key_type"])  # Convert 'ECDSA', 'Dilithium' into numbers

# ---- Feature Engineering ----
df["gas_fee"] = df["gas_used"] * df["gas_price"]  # Total transaction cost
df["transaction_value_usd"] = df["value_eth"] * 3000  # Assuming ETH = $3000

# ---- Define Features & Target ----
features = ["transaction_value_usd", "gas_fee", "timestamp", "key_type"]
df = df[features + ["risk_score"]]  # Keep only necessary columns

# ---- Save Processed Dataset ----
df.to_csv("processed_blockchain_data.csv", index=False)
print("✅ Dataset Processing Complete. Saved as 'processed_blockchain_data.csv'.")
