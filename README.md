# 🐾 Animal Shelter Management System

A fullstack PERN (PostgreSQL, Express, React, Node.js) application for managing animal shelter operations, including authentication, animal records, adoptions, staff, medical records, donations, and more.

---

## 📦 Project Structure

```
Animal Shelter FULLSTACK/
│
├── server/                # Backend API (Node.js, Express, PostgreSQL)
│   ├── API_Docs.md        # API documentation
│   ├── index.js           # Main server entry point
│   ├── config/            # Database and passport config
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   └── routes/            # API route definitions
│
├── frontend/              # (To be added) React frontend
│
└── package.json           # Project dependencies and scripts
```

---

## 🚀 Features

- User authentication (JWT, role-based)
- Adopter, staff, volunteer, and vet management
- Animal records and medical records
- Donations and checkups
- Secure password hashing
- PostgreSQL connection pooling
- Modular code structure

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- PostgreSQL

### Backend Setup
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd "Animal Shelter FULLSTACK/server"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your PostgreSQL database in `config/db.js`.
4. Start the server:
   ```bash
   npm start
   ```
5. API will be available at `http://localhost:5000/api`

### Frontend Setup
- The React frontend will be added in the `frontend/` directory in a future update.

---

## 📚 API Documentation

See [`server/API_Docs.md`](server/API_Docs.md) for detailed API endpoints, request/response formats, and usage examples.

---

## 📝 To Do
- [x] Backend API (Express, PostgreSQL)
- [ ] Frontend (React) — *coming soon!*
- [ ] Dockerization
- [ ] Unit and integration tests
- [ ] CI/CD pipeline

---

## 👤 Author
Developed by Sanket

---

## 📄 License
This project is licensed under the MIT License.
