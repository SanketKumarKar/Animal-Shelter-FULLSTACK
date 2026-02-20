// App.jsx
import { useMemo, useState, Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createAppTheme } from "./theme";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/AppLayout";
// Pages
import LandingPage from "./pages/LandingPage";
import PublicAnimals from "./pages/PublicAnimals";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import AnimalList from "./pages/Animals/AnimalList";
import AnimalForm from "./pages/Animals/AnimalForm";
import AnimalDetails from "./pages/Animals/AnimalDetails";
import AdopterList from "./pages/Adopters/AdopterList";
import AdopterForm from "./pages/Adopters/AdopterForm";
import StaffList from "./pages/Staff/StaffList";
import StaffForm from "./pages/Staff/StaffForm";
import MedicalRecords from "./pages/Medical/MedicalRecords";
import DonationList from "./pages/Donations/DonationList";
import VolunteerList from "./pages/Volunteers/VolunteerList";

// Error Boundary
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error("App Error:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, fontFamily: "sans-serif" }}>
          <h1 style={{ color: "#EF4444" }}>Something went wrong</h1>
          <pre style={{ background: "#FEF2F2", padding: 16, borderRadius: 8, overflow: "auto" }}>
            {this.state.error?.message}
          </pre>
          <button onClick={() => window.location.reload()} style={{ marginTop: 16, padding: "8px 16px", cursor: "pointer" }}>
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [mode, setMode] = useState("light");
  const theme = useMemo(() => createAppTheme(mode), [mode]);
  const toggleColorMode = () => setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <NotificationProvider>
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/animals" element={<PublicAnimals />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Dashboard Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <AppLayout toggleColorMode={toggleColorMode} mode={mode} />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="animals" element={<AnimalList />} />
                  <Route path="animals/new" element={<AnimalForm />} />
                  <Route path="animals/:id" element={<AnimalDetails />} />
                  <Route path="adopters" element={<AdopterList />} />
                  <Route path="adopters/new" element={<AdopterForm />} />
                  <Route
                    path="staff"
                    element={
                      <ProtectedRoute roles={["admin", "staff"]}>
                        <StaffList />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="staff/new"
                    element={
                      <ProtectedRoute roles={["admin", "staff"]}>
                        <StaffForm />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="medical"
                    element={
                      <ProtectedRoute roles={["admin", "staff"]}>
                        <MedicalRecords />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="donations"
                    element={
                      <ProtectedRoute roles={["admin"]}>
                        <DonationList />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="volunteers"
                    element={
                      <ProtectedRoute roles={["admin"]}>
                        <VolunteerList />
                      </ProtectedRoute>
                    }
                  />
                </Route>
              </Routes>
            </BrowserRouter>
          </NotificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
