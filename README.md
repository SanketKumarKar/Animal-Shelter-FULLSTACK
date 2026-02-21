# PawShelter 🐾 | Animal Shelter Management System

[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MUI](https://img.shields.io/badge/Material--UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)

A modern, full-stack management solution for animal shelters. **PawShelter** streamlines pet adoption workflows, medical record keeping, and donation tracking with a premium, interactive user experience.

---

## ✨ Key Features

-   🛡️ **Role-Based Access Control (RBAC)**: Distinct dashboards and permissions for Admins (Stats & Management), Staff (Limited operations), and regular Users.
-   💹 **Live Donation Growth**: Beautifully visualized donation analytics powered by **Recharts**.
-   📋 **Comprehensive Management**: Full CRUD operations for Animals, Adopters, Staff, and Volunteers.
-   🏥 **Medical Tracking**: Dedicated module for medical records, checkups, and veterinarian assignments.
-   🌓 **Premium UI/UX**: Sleek Glassmorphism components, dark/light mode, and smooth transistions using **Framer Motion**.
-   🔒 **Secure Authentication**: JWT-based security with Passport.js, AuthContext for state management, and protected route logic with encrypted passwords via Bcrypt.

---

## 🏗️ Architecture & Infrastructure

### **Frontend Implementation**
- **State Management**: React Context API (`AuthContext`, `NotificationContext`) for efficient global state without the complexity of Redux.
- **Service Layer**: Centralized Axios configuration with request/response interceptors for seamless JWT management and unified error handling.
- **Routing Strategy**: React Router v7 with nested, role-protected routes and automatic redirection logic.
- **Theme System**: Custom-configured Material-UI theme for a consistent, premium aesthetic.

### **Backend & Database**
- **Relational Integrity**: Robust PostgreSQL schema managing complex relationships between Animals, Adopters, and Medical Records.
- **Security First**: Bcrypt hash encryption and JWT-based session persistence with Passport.js.

---

## 🛠️ Tech Stack & Library Highlights

### **Frontend**
| Library | Purpose |
| :--- | :--- |
| **Material UI (v7)** | Premium component library for high-end, responsive design. |
| **Recharts** | Dynamic SVG-based charts for donation and adoption analytics. |
| **Framer Motion** | Industry-standard animation library for smooth UI transitions. |
| **Axios** | Robust HTTP client with JWT interceptor support. |
| **React Router v7** | Advanced client-side routing and role-based protection. |
| **jwt-decode** | Secure decoding of JWT tokens for UI state updates. |

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
| `GET` | `/api/animals/public` | Public list for landing page (Staff names hidden for privacy). |
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
- Node.js (v18+) & PostgreSQL

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
│   │   ├── components/  # Nav, Sidebar, ProtectedRoute, Loaders
│   │   ├── pages/       # Dashboards (Admin/Staff/User), Animal & Adopter Lists
│   │   ├── context/     # Auth & Notification providers
│   │   └── services/    # API abstraction & Axios interceptors
├── server/              # Express backend
│   ├── routes/          # Authentication & Resource endpoints
│   ├── config/          # Passport & DB configurations
│   ├── middleware/      # Auth & Role-based guards
│   └── API_Docs.md      # Detailed endpoint documentation
├── db.sql               # Database schema
└── seed.sql             # Sample data
```

---

## 📊 Technical Highlights & Statistics

- **Organized Frontend**: 21+ components, 12 pages, and 2 global context providers.
- **Robust Security**: Role-based routing (Public: 3, Protected: 8) with token persistence.
- **Clean Code**: Strict separation of concerns (Services, Contexts, UI).
- **UX Excellence**: Loading states, confirmation dialogs, and real-time notifications.

## ⚠️ Known Limitations

-   **Animal Details**: The detailed view for individual animals is currently a placeholder and needs full implementation.
-   **Media Uploads**: Image and document upload functionality for animals and medical records is not yet implemented.
-   **Data Pagination**: Large data sets (animals, adopters) currently load all at once, which may impact performance as the database grows.
-   **Advanced Search**: Lack of complex filtering and search capabilities in the list views.
-   **Medical UI**: While backend logic exists for medical records, the frontend UI for managing them is pending.
-   **Notifications**: Real-time updates and email notifications are not yet implemented.

---

## 🔜 Future Roadmap

- [ ] **High Priority**: Medical records management UI, Image upload for animals.
- [ ] **Medium Priority**: Staff management CRUD, Donation tracking UI.
- [ ] **Low Priority**: Real-time notifications, Activity feed, and PDF Reports.

---

## 🤝 Contribution
Contributions are welcome! Feel free to open an issue or submit a pull request.

*Built with ❤️ for animals.*
