import { useAuth } from "../../context/AuthContext";
import AdminDashboard from "./AdminDashboard";
import StaffDashboard from "./StaffDashboard";
import UserDashboard from "./UserDashboard";

export default function Dashboard() {
    const { user } = useAuth();
    if (user?.role === "admin") return <AdminDashboard />;
    if (user?.role === "staff") return <StaffDashboard />;
    return <UserDashboard />;
}
