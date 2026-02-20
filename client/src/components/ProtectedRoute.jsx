import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Box, CircularProgress } from "@mui/material";

export default function ProtectedRoute({ children, roles }) {
    const { user, loading } = useAuth();

    if (loading)
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
                <CircularProgress />
            </Box>
        );

    if (!user) return <Navigate to="/login" replace />;

    if (roles && !roles.includes(user.role))
        return <Navigate to="/dashboard" replace />;

    return children;
}
