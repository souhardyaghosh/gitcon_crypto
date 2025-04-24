import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import RobustScaler
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib
import matplotlib.pyplot as plt

# ---- Load Processed Dataset ----
file_path = "processed_blockchain_data.csv"
df = pd.read_csv(file_path)

# ---- Data Exploration ----
print("\n=== Data Summary ===")
print(df.describe())

print("\n=== Target Distribution ===")
print(df["risk_score"].describe())

plt.hist(df["risk_score"], bins=50, edgecolor="black")
plt.title("Risk Score Distribution")
plt.xlabel("Risk Score")
plt.ylabel("Frequency")
plt.show()

# ---- Define Features & Target ----
X = df.drop(columns=["risk_score"])  # Features
y = df["risk_score"]  # Target variable

# ---- Check for Multicollinearity ----
corr_matrix = X.corr().abs()
plt.matshow(corr_matrix, cmap="coolwarm")
plt.title("Feature Correlation Matrix")
plt.colorbar()
plt.show()

# ---- Feature Scaling (Robust Scaling for outliers) ----
scaler = RobustScaler()
X_scaled = scaler.fit_transform(X)

# Save scaler for future use
joblib.dump(scaler, "scaler.pkl")

# ---- Train-Test Split ----
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y,
    test_size=0.2,
    random_state=42,
    stratify=pd.qcut(y, q=5, duplicates="drop")  # Stratified split for balanced target distribution
)

# ---- Model Training with Hyperparameter Tuning ----
param_grid = {
    'n_estimators': [100, 200, 300],
    'max_depth': [5, 10, 15, None],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4]
}

model = GridSearchCV(
    RandomForestRegressor(random_state=42),
    param_grid,
    cv=5,
    scoring='neg_mean_squared_error',
    n_jobs=-1,
    verbose=2
)

model.fit(X_train, y_train)

print("\n=== Best Parameters ===")
print(model.best_params_)

# ---- Predictions & Evaluation ----
y_pred = model.predict(X_test)

mse = mean_squared_error(y_test, y_pred)
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"\n✅ Mean Squared Error: {mse:.2f}")
print(f"✅ Mean Absolute Error: {mae:.2f}")
print(f"✅ R² Score: {r2:.2f}")

# ---- Feature Importance ----
importances = model.best_estimator_.feature_importances_
features = df.drop(columns=["risk_score"]).columns
indices = np.argsort(importances)[::-1]

print("\n=== Feature Importance ===")
for i in range(len(features)):
    print(f"{features[indices[i]]}: {importances[indices[i]]:.4f}")

# ---- Save Model ----
joblib.dump(model.best_estimator_, "risk_score_model.pkl")
print("\n✅ Model saved as 'risk_score_model.pkl'")
