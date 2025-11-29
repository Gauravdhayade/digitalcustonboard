# DigiOnboard – Digital Customer Onboarding System  

DigiOnboard is a **Full-Stack Java + React Digital KYC & Banking Onboarding Platform** designed to simplify customer identity verification using **OTP Validation, Document Upload, PAN/Aadhar Verification & Automated KYC Status Tracking**.

Built using:

- **Spring Boot (Java)** – Backend REST APIs  
- **React.js** – Frontend UI  
- **MySQL** – Database  
- **HTML/CSS/Tailwind** – UI  
- **Maven / Node.js**  

This project is designed similar to real-world banking onboarding flows (HDFC / SBI / ICICI level KYC automation).

---

## 🚀 Features  

| Module | Description |
|--------|-------------|
| **User Registration** | Register using Mobile + OTP Verification |
| **Login / Authentication** | Email/Password Login |
| **Dashboard** | Quick Actions for Account Open, KYC, Transactions |
| **KYC Document Upload** | Upload Aadhar, PAN, Address Proof, Signature |
| **KYC Status Tracking** | Pending / Verified / Rejected statuses |
| **Admin Panel** | Verify / Reject customer KYC |
| **Account Opening** | Create bank account for customer |
| **Transaction History** | Deposit / Withdraw tracking |

---

# 🏗️ System Architecture  

React Frontend → Spring Boot REST API → MySQL DB
↓ ↓ ↓
UI Pages Controllers KYC Details
Forms Services Transactions
Routing Repository Accounts

yaml
Copy code

---

# 📂 Folder Structure  

digitalcustonboard/
│
├── dco-frontend/ # React Frontend
│ ├── src/
│ │ ├── components/
│ │ │ ├── RegisterForm.jsx
│ │ │ ├── LoginForm.jsx
│ │ │ ├── Dashboard.jsx
│ │ │ ├── UploadDocs.jsx
│ │ │ ├── KycProgress.jsx
│ │ │ ├── TransactionForm.jsx
│ │ │ ├── AccountOpenForm.jsx
│ │ │ ├── Sidebar.jsx
│ │ │ └── Profile.jsx
│ │ ├── App.js
│ │ └── index.js
│ └── package.json
│
├── src/main/java/com/technorun/digitalcustonboard/
│ ├── controller/
│ │ ├── AuthController.java
│ │ ├── KycController.java
│ │ ├── AccountController.java
│ │ └── TransactionController.java
│ ├── entity/
│ │ ├── UserEntity.java
│ │ ├── KycEntity.java
│ │ └── AccountEntity.java
│ ├── repository/
│ ├── service/
│ ├── serviceimpl/
│ └── DigitalcustonboardApplication.java
│
├── uploads/ # Uploaded KYC documents
├── pom.xml
└── README.md

yaml
Copy code

---

# 🧪 API Endpoints (Backend)

## 🔐 Authentication  
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login |

---

## 🪪 KYC APIs  
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/kyc/upload` | Upload KYC Documents |
| GET | `/kyc/status/{userId}` | Get KYC Status |
| PUT | `/kyc/{id}/status` | Admin Verify/Reject |

---

## 🧾 Account APIs  
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/account/create` | Create bank account |
| GET | `/account/{id}` | Get account details |

---

## 💸 Transaction APIs  
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/transaction/deposit` | Deposit money |
| POST | `/transaction/withdraw` | Withdraw money |
| GET | `/transaction/history/{userId}` | View history |

---

# 🚀 How to Run Project Locally

## 🖥️ Backend (Spring Boot)
cd digitalcustonboard
mvn spring-boot:run

shell
Copy code

## 🌐 Frontend (React)
cd dco-frontend
npm install
npm start

yaml
Copy code
