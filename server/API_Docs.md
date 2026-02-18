
# 🐾 Animal Shelter Management System API

## Base URL
`http://localhost:5000/api`

---

## 🔐 Authentication

All protected routes require:

`Authorization: Bearer <JWT_TOKEN>`

---

# 🔑 AUTH MODULE

## 1️⃣ Register User

**Endpoint:**
```
POST /auth/register
```

**Request Body:**
```json
{
  "name": "Sanket",
  "email": "sanket@gmail.com",
  "password": "123456",
  "role": "admin"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "Sanket",
  "email": "sanket@gmail.com",
  "role": "admin"
}
```

## 2️⃣ Login User

**Endpoint:**
```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "sanket@gmail.com",
  "password": "123456"
}
```

**Response:**
```json
{
  "token": "JWT_TOKEN_HERE"
}
```

## 3️⃣ Get Current User

**Endpoint:**
```
GET /auth/me
```

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Response:**
```json
{
  "id": 1,
  "name": "Sanket",
  "email": "sanket@gmail.com",
  "role": "admin"
}
```

---

# 🧍 ADOPTER MODULE

## Get All Adopters
**Endpoint:**
```
GET /adopters
```

**Response:**
```json
[
  {
    "ad_id": 1,
    "name": "Rahul Sharma",
    "address": "Delhi"
  }
]
```

## Create Adopter
**Endpoint:**
```
POST /adopters
```

**Request Body:**
```json
{
  "name": "Rahul Sharma",
  "address": "Delhi"
}
```

## Delete Adopter
**Endpoint:**
```
DELETE /adopters/:id
```

---

# 📞 ADOPTER PHONE MODULE

## Add Phone
**Endpoint:**
```
POST /adopter-phones
```

**Request Body:**
```json
{
  "ph": "9876543210",
  "ad_id": 1
}
```

## Get All Phones
**Endpoint:**
```
GET /adopter-phones
```

## Delete Phone
**Endpoint:**
```
DELETE /adopter-phones/:ph/:ad_id
```

---

# 👨‍💼 STAFF MODULE

## Get Staff
**Endpoint:**
```
GET /staff
```

## Create Staff
**Endpoint:**
```
POST /staff
```

**Request Body:**
```json
{
  "name": "Dr. Mehta",
  "role": "Caretaker"
}
```

---

# 📱 STAFF PHONE MODULE

## Add Staff Phone
**Endpoint:**
```
POST /staff-phones
```

**Request Body:**
```json
{
  "ph": "9123456780",
  "stff_id": 1
}
```

## Get Staff Phones
**Endpoint:**
```
GET /staff-phones
```

## Delete Staff Phone
**Endpoint:**
```
DELETE /staff-phones/:ph/:stff_id
```

---

# 🐶 ANIMAL MODULE

## Get All Animals (With JOIN)
**Endpoint:**
```
GET /animals
```

**Response:**
```json
[
  {
    "anl_id": 1,
    "name": "Tommy",
    "age": 3,
    "breed": "Labrador",
    "adm_date": "2025-01-15",
    "adopter_name": "Rahul Sharma",
    "staff_name": "Dr. Mehta"
  }
]
```

## Create Animal
**Endpoint:**
```
POST /animals
```

**Request Body:**
```json
{
  "name": "Tommy",
  "age": 3,
  "breed": "Labrador",
  "adm_date": "2025-01-15",
  "ad_id": 1,
  "stff_id": 1
}
```

---

# 🏥 MEDICAL RECORD MODULE

## Create Medical Record
**Endpoint:**
```
POST /medrec
```

**Request Body:**
```json
{
  "vacc_det": "Rabies Vaccine",
  "treatment": "General Checkup",
  "anl_id": 1
}
```

## Get Medical Records
**Endpoint:**
```
GET /medrec
```

---

# 🩺 CHECKUP MODULE

## Add Checkup
**Endpoint:**
```
POST /checkups
```

**Request Body:**
```json
{
  "symptoms": "Fever",
  "details": "Mild infection",
  "checkup_date": "2025-02-01",
  "r_id": 1
}
```

---

# 👨‍⚕️ VET MODULE

## Assign Vet
**Endpoint:**
```
POST /vets
```

**Request Body:**
```json
{
  "name": "Dr. Singh",
  "doc_id": "DOC123",
  "ph": "9999999999",
  "checkup_id": 1
}
```

---

# 💰 DONATION MODULE

## Get Donations
**Endpoint:**
```
GET /donations
```

## Create Donation
**Endpoint:**
```
POST /donations
```

**Request Body:**
```json
{
  "amt": 5000,
  "items": "Dog Food"
}
```

---

# 🤝 VOLUNTEER MODULE

## Add Volunteer
**Endpoint:**
```
POST /volunteers
```

**Request Body:**
```json
{
  "name": "Amit",
  "role": "Helper",
  "d_id": 1
}
```

---

# 🔐 Security Features

- JWT Authentication
- Passport JWT Strategy
- Role-Based Authorization
- Password Hashing using bcrypt
- Stateless Authentication
- PostgreSQL Connection Pooling

---

# 📌 Error Responses

**401 Unauthorized**
```json
{
  "message": "Unauthorized"
}
```

**403 Forbidden**
```json
{
  "message": "Access denied"
}
```

**500 Server Error**
```json
{
  "error": "Internal Server Error"
}
```

---

# 🚀 Project Architecture

```
React Frontend
      ↓
Axios (Bearer Token)
      ↓
Express Server
      ↓
Passport JWT
      ↓
PostgreSQL (Pool)
```

---

# 📄 Author

Developed by Sanket Kumar Kar
PERN Stack (PostgreSQL, Express, React, Node.js)

