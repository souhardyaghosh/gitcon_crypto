# 🚀 Post-Quantum Blockchain Security

## 🔒 Problem Statement
Quantum computing threatens existing cryptographic methods, requiring post-quantum security for blockchain networks. Our project aims to develop quantum-resistant cryptographic algorithms and AI-driven fraud detection mechanisms.

---

## 🔑 Key Features

### 🛡️ Hybrid Signatures with Adaptive Thresholds
- Uses **context-aware hybrid signing** to balance security and efficiency.
- **High-value transactions** require **ECDSA + Dilithium** (dual signatures).
- **Low-value transactions** use **Dilithium-only** (reducing signature bloat by 50%).

### 🔗 Quantum-Resistant Key Aggregation
- Reduces signature storage **by 80%** using **BLS signature aggregation**.
- Aggregates multiple **ECDSA & Dilithium signatures** into **one BLS signature**.

### 🤖 AI-Driven Quantum Threat Scoring
- Trains an **ML model** to predict **node vulnerability** to quantum threats.
- Features include **Key Type (ECDSA/Dilithium), Transaction Volume, Stake Size**.
- Outputs a **Quantum Risk Score (0-100%)**.

### ⏳ Risk-Based Transaction Delays
- High-risk transactions are **delayed dynamically** to prevent fraudulent activity.
- **Low-risk (0-50)**: Instant processing.
- **Medium-risk (50-75)**: 2-5 minute delay for validation.
- **High-risk (75-100)**: 10+ minute delay, requiring **additional verification**.

---

## 🔄 Project Flow

### 1️⃣ Transaction Initiation
- User submits a **transaction request**.
- System checks **transaction value & risk factors**.

### 2️⃣ Hybrid Signature Generation
- **Adaptive signing logic** assigns ECDSA, Dilithium, or both.
- High-value transactions → **Dual Signature (ECDSA + Dilithium)**.
- Low-value transactions → **Dilithium-only** for efficiency.

### 3️⃣ Signature Aggregation (Quantum-Resistant)
- **BLS Signature Aggregation** combines multiple transaction signatures.
- Reduces **block size & speeds up validation**.

### 4️⃣ AI-Driven Threat Analysis
- **Machine Learning model** evaluates **Quantum Risk Score**.
- **Red Nodes** = ECDSA (High Risk), **Green Nodes** = Dilithium (Low Risk).
- System prioritizes **upgrading weak nodes**.

### 5️⃣ Risk-Based Transaction Delays
- If risk **>75**, transaction is **temporarily held**.
- Additional **identity verification (OTP, MFA)** required.
- If cleared, transaction **proceeds to blockchain**.

---

## 🛠️ Installation & Setup
```bash
# Clone the repo
git clone https://github.com/souhardyaghosh/gitcon_crypto.git
cd gitcon_crypto

# Install dependencies
pip install -r requirements.txt

# Run the AI model training
python train_model.py

# Start the blockchain security API
python backend_api.py
```

---

## 📂 Project Structure
```plaintext
📦 gitcon_crypto
├── 📁 data                   # Dataset for training AI model
├── 📁 models                 # Trained ML models for risk scoring
├── 📁 blockchain             # Blockchain transaction processing
├── backend_api.py            # API backend for blockchain security
├── train_model.py            # AI Model Training script
├── requirements.txt          # Python dependencies
└── README.md                 # Documentation
```

---

## 👥 Team Members
- **Sarmad Sultan**
- **Shazeb Amman**
- **Garav Mallik**
- **Ayush Kashyap**
- **Souhardya Ghosh**

---

## 📜 License
This project is licensed under the **MIT License**.

---

🚀 **Let's build a Quantum-Safe Future!**
