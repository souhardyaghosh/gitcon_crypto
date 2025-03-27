# 🚀 Post-Quantum Blockchain Security

## 🔒 Overview
This project implements **Post-Quantum Blockchain Security** using **hybrid cryptographic signatures**, **quantum-resistant key aggregation**, and **AI-driven threat detection** to safeguard blockchain networks against quantum attacks. 

## 🎯 Key Features
### 1️⃣ **Hybrid Signatures with Adaptive Thresholds**
- Dynamically selects signing method based on transaction value.
- **High-value transactions**: Use **ECDSA + Dilithium** for maximum security.
- **Low-value transactions**: Use only **Dilithium** to save space.
- **Legacy transactions**: Allow **ECDSA-only** for backward compatibility.

### 2️⃣ **Quantum-Resistant Key Aggregation**
- Reduces **signature size by 80%** by aggregating multiple transaction signatures into **one BLS signature**.
- Uses **py-ecc** for BLS aggregation.
- Optimizes **block space** and **verification speed**.

### 3️⃣ **AI-Driven Quantum Threat Scoring**
- Assigns a **Quantum Risk Score (0-100%)** to each blockchain node.
- Features considered:
  - Key type (**ECDSA vs. Dilithium**)
  - Transaction volume
  - Stake size
- Helps **prioritize** which nodes should upgrade first.

## 🔗 **Project Flow**

### **1️⃣ Transaction Signing & Verification**
1. A transaction request is made.
2. The system determines the **appropriate signing method** based on **transaction value**.
3. The signature is **generated using ECDSA, Dilithium, or both**.
4. The transaction is **submitted to the blockchain**.

### **2️⃣ Signature Aggregation**
5. Multiple signatures are **aggregated into a single BLS signature**.
6. The blockchain **validates the aggregated signature** for efficiency.

### **3️⃣ AI Threat Detection & Risk Scoring**
7. AI analyzes transactions to detect **anomalies**.
8. Each blockchain node receives a **Quantum Risk Score**.
9. **High-risk nodes are flagged** and recommended for an upgrade.

## 🛠️ **Installation & Setup**
```bash
# Clone the repository
git clone https://github.com/yourrepo/post-quantum-blockchain.git
cd post-quantum-blockchain

# Install dependencies
pip install -r requirements.txt
```

## 🚀 **Running the Project**
```bash
# Run the transaction signing module
python sign_transaction.py

# Run the signature aggregation module
python aggregate_sigs.py

# Run AI risk scoring model
python quantum_risk_model.py
```

## 📂 **Project Structure**
```
📦 post-quantum-blockchain
 ┣ 📂 models
 ┃ ┣ 📜 hybrid_sign.py  # Hybrid signature logic
 ┃ ┣ 📜 bls_aggregation.py  # BLS-based signature aggregation
 ┃ ┣ 📜 quantum_risk_ai.py  # AI-driven risk assessment
 ┃ ┗ 📜 train_model.py  # ML training script
 ┣ 📂 data
 ┃ ┣ 📜 transactions.csv  # Sample blockchain transactions
 ┃ ┗ 📜 risk_scores.csv  # AI-generated risk scores
 ┣ 📜 sign_transaction.py  # Main transaction signing script
 ┣ 📜 aggregate_sigs.py  # Signature aggregation handler
 ┣ 📜 quantum_risk_model.py  # Risk detection execution
 ┣ 📜 requirements.txt  # Dependencies
 ┣ 📜 README.md  # This file 📄
┗ 📜 LICENSE  # Project license
```

## 📊 **Example Output**
```bash
Transaction Value: $1200
Signing Method: Hybrid (ECDSA + Dilithium)
Signature Size Reduced by: 50%
Quantum Risk Score: 87% (High Risk)
```

## 📢 **Why This Matters**
✅ **Future-Proof Security** – Protects blockchain transactions from quantum attacks.
✅ **Efficient Storage & Verification** – Aggregated signatures reduce blockchain bloat.
✅ **AI-Driven Insights** – Identifies vulnerable nodes before they become targets.

## 🤝 **Contributing**
Pull requests and suggestions are welcome! 😊

## 📜 **License**
MIT License © 2025 Souhardya Ghosh

---
### 🚀 **Let's Secure the Blockchain for a Post-Quantum Era!** 🔐
