# PawShelter 🐾 | Animal Shelter Management System

[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MUI](https://img.shields.io/badge/Material--UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)

A modern, full-stack management solution for animal shelters. **PawShelter** streamlines pet adoption workflows, medical record keeping, and donation tracking with a premium, interactive user experience.

---

## ✨ Key Features

-   🛡️ **Role-Based Access Control (RBAC)**: Distinct dashboards and permissions for Admins, Staff, and regular Users.
-   💹 **Live Donation Growth**: Beautifully visualized donation analytics powered by **Recharts**.
-   📋 **Comprehensive Management**: Full CRUD operations for Animals, Adopters, Staff, and Volunteers.
-   🏥 **Medical Tracking**: Dedicated module for medical records, checkups, and veterinarian assignments.
-   🌓 **Premium UI/UX**: Sleek Glassmorphism components, dark/light mode, and smooth transistions using **Framer Motion**.
-   🔒 **Secure Authentication**: JWT-based security with Passport.js and encrypted passwords via Bcrypt.

---

## 🛠️ Tech Stack & Library Highlights

### **Frontend**
| Library | Purpose |
| :--- | :--- |
| **Material UI (v7)** | Premium component library for high-end, responsive design. |
| **Recharts** | Dynamic SVG-based charts for donation and adoption analytics. |
| **Framer Motion** | Industry-standard animation library for smooth UI transitions. |
| **Axios** | Robust HTTP client for seamless API integration. |
| **React Router v7** | Advanced client-side routing and navigation. |

### **Backend**
| Library | Purpose |
| :--- | :--- |
| **Express.js (v5)** | Fast, unopinionated web framework for Node.js. |
| **node-postgres (pg)** | Non-blocking PostgreSQL client for reliable data operations. |
| **Passport.js & JWT** | Dual-layered security for authentication and authorization. |
| **BcryptJS** | Sophisticated password hashing for user data protection. |

### **Database**
-   **PostgreSQL**: A robust relational database for handling complex data relationships (Animals ↔ Adopters ↔ Medrecs).

---

## 📡 REST API Documentation

The project follows a standard RESTful architecture with JSON request/response formats. All protected routes require a JWT token passed in the `Authorization` header.

> [!TIP]
> **For full API documentation including request/response schemas, check out [API_Docs.md](server/API_Docs.md) in the `server` folder.**

### **🔐 Authentication**
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new user with roles (`admin`, `staff`, `user`). |
| `POST` | `/api/auth/login` | Login and receive JWT access token. |
| `GET` | `/api/auth/me` | Fetch detailed profile of the logged-in user. |

### **🐾 Animals & Medical**
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/animals` | List all animals with attached adopter and staff names. |
| `POST` | `/api/animals` | Register a new shelter resident. |
| `POST` | `/api/medrec` | Create a new medical history record for an animal. |
| `POST` | `/api/checkups` | Log a medical checkup (Symptoms, Treatment, Date). |
| `POST` | `/api/vets` | Assign a veterinarian to a specific checkup session. |

### **🧍 Adopters & Volunteers**
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/adopters` | Retrieve all registered adopters. |
| `POST` | `/api/adopters` | Add a new adopter profile (Restricted: Admin/Staff). |
| `PUT` | `/api/adopters/:id` | Update existing adopter information (Restricted: Admin/Staff). |
| `POST` | `/api/adopter-phones` | Linked multiple contact numbers to an adopter. |
| `GET` | `/api/volunteers` | View active volunteers and their assigned roles. |

### **💰 Donations**
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/donations` | View audit trail of all donations (Sorted by Date). |
| `GET` | `/api/donations/growth` | Fetch monthly aggregated sums for dashboard charting. |
| `POST` | `/api/donations` | Log a new contribution (Amount, Items, Custom Date). |

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
-   Node.js (v18+)
-   PostgreSQL installed and running

### 1. Clone & Install Dependencies
```bash
# Clone the repository
git clone <your-repo-url>
cd animal-shelter-fullstack

# Install Server Dependencies
cd server
npm install

# Install Client Dependencies
cd ../client
npm install
```

### 2. Database Setup
1.  Create a new PostgreSQL database named `animal_shelter`.
2.  Execute the schema in `db.sql`.
3.  (Optional) Populate with sample data using `seed.sql`.

### 3. Environment Variables
Create a `.env` file in the `server` directory:
```env
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=animal_shelter
JWT_SECRET=your_super_secret_key
```

### 4. Run the Application
Open two terminals:

**Terminal 1: Backend**
```bash
cd server
npm run dev
```

**Terminal 2: Frontend**
```bash
cd client
npm run dev
```

The app will be live at `http://localhost:5173`.

---

## 📂 Project Structure

```text
├── client/              # React + Vite frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Dashboard and List views
│   │   └── services/    # API abstraction layer
├── server/              # Express backend
│   ├── routes/          # RESTful API endpoints
│   ├── config/          # Passport & DB configurations
│   └── middleware/      # Authentication & Role guards
│   └── API_Docs.md      # Detailed endpoint documentation
├── db.sql               # Database schema
└── seed.sql             # Sample data
```

---

## 🤝 Contribution
Contributions are welcome! Feel free to open an issue or submit a pull request.

*Built with ❤️ for animals.*
