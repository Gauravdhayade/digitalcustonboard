# DigiOnboard – Digital Customer Onboarding System

DigiOnboard is a full-stack Java Spring Boot application designed to simplify and digitize customer onboarding with OTP-based identity verification, document upload, and automated validation flow.  
The system supports multi-stage KYC verification using **mobile OTP, email OTP, PAN verification, document upload, and status tracking**.

---

## 🚀 Features

| Module | Description |
|--------|-------------|
| **User Profile Registration** | Stores user details (name, phone, email, DOB, PAN, etc.) |
| **Duplicate Validation** | Prevents registration if email / phone / PAN already exists |
| **OTP Verification** | Mobile OTP → Email OTP verification flow |
| **Document Upload** | Upload Aadhaar, PAN, Signature, Address proof (Binary storage in DB) |
| **Token Table System** | Stores OTP with status, expiry & type (MOBILE / EMAIL) |
| **Global Exception Handling** | Custom API error responses |
| **Spring Security Configurable** | Currently open endpoints, can be restricted later |
| **REST APIs for CRUD** | Create, Read, Update, Delete user |
| **Database Mapping using JPA** | One-to-one & One-to-many relational schema |

---

## 🧠 Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Java 17, Spring Boot 3.x |
| Security | Spring Security (configurable) |
| ORM / DB Layer | JPA + Hibernate |
| Database | MySQL |
| API Format | JSON (REST) |
| File Upload | Multipart (stored as LONGBLOB) |
| Build Tool | Maven |

---

## 📂 Project Structure (Important Files)

src/
├── main/java/com/technorun/digitalcustonboard/
│ ├── DigitalcustonboardApplication.java
│ ├── config/
│ │ └── SecurityConfig.java
│ ├── controller/ (not shown yet)
│ ├── dto/
│ │ └── UserProfileDTO.java
│ ├── entity/
│ │ ├── UserDetailsEntity.java
│ │ ├── UserProfileEntity.java
│ │ └── VerificationTokenEntity.java
│ ├── repository/
│ │ ├── UserProfileRepository.java
│ │ └── VerificationTokenRepository.java
│ ├── service/
│ │ └── UserProfileService.java
│ ├── serviceimpl/
│ │ └── UserProfileServiceImpl.java
│ └── exception/
│ └── GlobalExceptionHandler.java


---

## 🗄️ Database Schema Overview

### `user_profile` table  
✔ Stores personal details + verification flags + documents

### `verification_token` table  
✔ Stores OTP with type: (`MOBILE`, `EMAIL`)  
✔ One user can have multiple tokens → One-to-many relation

### `user_details` table  
✔ Login auth table (future use)

---

## 🔐 OTP Verification Flow



User Registration → Save Data → Generate Mobile OTP → User Verifies OTP
↓
If Mobile Verified → System Auto-generates Email OTP
↓
User Verifies Email OTP → KYC Flags Updated in DB


Token status updates:
- `status = true` → Active
- `status = false` → Used or expired

---

## 📌 Important Business Logic (Summary)

✅ Duplicate Check: Email, Phone, PAN  
✅ OTP Storage + Auto-generation  
✅ Verified fields get updated in DB (`isEmailVerified`, `isPhoneVerified`)  
✅ Docs saved as byte[] → BLOB in MySQL  
✅ Verified user is allowed further processing

---

## ▶️ How to Run the Project

```bash
# 1. Clone repo
git clone https://github.com/<username>/DigiOnboard.git
cd DigiOnboard

# 2. Configure application.properties with MySQL creds

# 3. Run Spring Boot
mvn spring-boot:run


## 🔮 Future Enhancements
- JWT based authentication for login
- Admin dashboard to verify KYC
- Email service via SMTP or AWS SES
- Frontend UI in React / Angular

---

## 👤 Author
**Developer:** Gaurav Dhayade
**Role:** Java Full Stack Developer  
