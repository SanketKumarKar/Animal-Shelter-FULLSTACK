
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

**Response (201 Created):**
```json
{
  "ad_id": 1,
  "name": "Rahul Sharma",
  "address": "Delhi"
}
```

**Request Body:**
```json
{
  "name": "Rahul Sharma",
  "address": "South Delhi"
}
```

**Response (200 OK):**
```json
{
  "ad_id": 1,
  "name": "Rahul Sharma",
  "address": "South Delhi"
}
```

## Delete Adopter
**Endpoint:**
```
DELETE /adopters/:id
```

**Response (200 OK):**
```json
{
  "message": "Adopter deleted"
}
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

**Response (201 Created):**
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

**Response (200 OK):**
```json
[
  {
    "ph": "9876543210",
    "ad_id": 1,
    "adopter_name": "Rahul Sharma"
  }
]
```

## Delete Phone
**Endpoint:**
```
DELETE /adopter-phones/:ph/:ad_id
```

**Response (200 OK):**
```json
{
  "message": "Adopter phone deleted"
}
```

---

# 👨‍💼 STAFF MODULE

## Get Staff
**Endpoint:**
```
GET /staff
```

**Response (200 OK):**
```json
[
  {
    "stff_id": 1,
    "name": "Dr. Mehta",
    "role": "Caretaker"
  }
]
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

**Response (201 Created):**
```json
{
  "stff_id": 1,
  "name": "Dr. Mehta",
  "role": "Caretaker"
}
```

## Update Staff
**Endpoint:**
```
PUT /staff/:id
```

**Request Body:**
```json
{
  "name": "Dr. Anil Mehta",
  "role": "Senior Caretaker"
}
```

**Response (200 OK):**
```json
{
  "stff_id": 1,
  "name": "Dr. Anil Mehta",
  "role": "Senior Caretaker"
}
```

## Delete Staff
**Endpoint:**
```
DELETE /staff/:id
```

**Response (200 OK):**
```json
{
  "message": "Staff deleted"
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

**Response (201 Created):**
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

**Response (200 OK):**
```json
[
  {
    "ph": "9123456780",
    "stff_id": 1,
    "staff_name": "Dr. Mehta"
  }
]
```

## Delete Staff Phone
**Endpoint:**
```
DELETE /staff-phones/:ph/:stff_id
```

**Response (200 OK):**
```json
{
  "message": "Staff phone deleted"
}
```

---

# 🐶 ANIMAL MODULE

## Get All Animals (With JOIN)
**Endpoint:**
```
GET /animals
```
*Includes staff_name for internal tracking.*

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

## Get Public Animals (Privacy Protected)
**Endpoint:**
```
GET /animals/public
```
*Staff names are excluded for privacy on the landing page.*

**Response:**
```json
[
  {
    "anl_id": 1,
    "name": "Tommy",
    "age": 3,
    "breed": "Labrador",
    "adm_date": "2025-01-15",
    "adopter_name": "Rahul Sharma"
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

**Response (201 Created):**
```json
{
  "anl_id": 1,
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

**Response (201 Created):**
```json
{
  "r_id": 1,
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

**Response (200 OK):**
```json
[
  {
    "r_id": 1,
    "vacc_det": "Rabies Vaccine",
    "treatment": "General Checkup",
    "anl_id": 1
  }
]
```

---

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

**Response (201 Created):**
```json
{
  "id": 1,
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

**Response (201 Created):**
```json
{
  "id": 1,
  "name": "Dr. Singh",
  "doc_id": "DOC123",
  "ph": "9999999999",
  "checkup_id": 1
}
```

## Get All Vets
**Endpoint:**
```
GET /vets
```

**Response:**
```json
[
  {
    "name": "Dr. Singh",
    "doc_id": "DOC123",
    "ph": "9999999999",
    "checkup_id": 1
  }
]
```

---

# 💰 DONATION MODULE

## Get Donations
**Endpoint:**
```
GET /donations
```

**Response (200 OK):**
```json
[
  {
    "d_id": 1,
    "amt": 5000,
    "items": "Dog Food",
    "don_date": "2025-02-23"
  }
]
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

**Response (201 Created):**
```json
{
  "d_id": 1,
  "amt": 5000,
  "items": "Dog Food",
  "don_date": "2025-02-23"
}
```

## Get Donations Growth
**Endpoint:**
```
GET /donations/growth
```

**Response (200 OK):**
```json
[
  {
    "month": "Feb 2025",
    "year": 2025,
    "month_num": 2,
    "amount": 5000
  }
]
```

---

# 🤝 VOLUNTEER MODULE

## Get All Volunteers
**Endpoint:**
```
GET /volunteers
```

**Response (200 OK):**
```json
[
  {
    "v_id": 1,
    "name": "Amit",
    "role": "Helper",
    "d_id": 1
  }
]
```

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

**Response (201 Created):**
```json
{
  "v_id": 1,
  "name": "Amit",
  "role": "Helper",
  "d_id": 1
}
```

## Update Volunteer
**Endpoint:**
```
PUT /volunteers/:id
```

**Request Body:**
```json
{
  "name": "Amit Kumar",
  "role": "Senior Helper",
  "d_id": 1
}
```

**Response (200 OK):**
```json
{
  "v_id": 1,
  "name": "Amit Kumar",
  "role": "Senior Helper",
  "d_id": 1
}
```

## Delete Volunteer
**Endpoint:**
```
DELETE /volunteers/:id
```

**Response (200 OK):**
```json
{
  "message": "Volunteer deleted"
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

