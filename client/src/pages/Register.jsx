import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import {
    Box, Card, CardContent, TextField, Button, Typography, InputAdornment,
    IconButton, Link, CircularProgress, MenuItem,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock, Person, Pets, Badge } from "@mui/icons-material";

export default function Register() {
    const { register } = useAuth();
    const { notify } = useNotification();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await register(form);
            notify("Account created! Please login 🎉");
            navigate("/login");
        } catch (err) {
            notify(err.response?.data?.message || "Registration failed", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                background: "linear-gradient(135deg, #EEF2FF 0%, #F8FAFC 50%, #F0FDF4 100%)",
            }}
        >
            {/* Left – Illustration */}
            <Box
                sx={{
                    flex: 1,
                    display: { xs: "none", md: "flex" },
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)",
                    color: "white",
                    p: 6,
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <Box sx={{ position: "absolute", top: -40, left: -40, width: 200, height: 200, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.08)" }} />
                <Box sx={{ position: "absolute", bottom: -60, right: -60, width: 300, height: 300, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.05)" }} />
                <Pets sx={{ fontSize: 80, mb: 3, opacity: 0.9 }} />
                <Typography variant="h3" fontWeight={700} sx={{ mb: 2, textAlign: "center" }}>
                    Join PawShelter
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.85, textAlign: "center", maxWidth: 380 }}>
                    Help us find forever homes for our furry friends. Sign up today!
                </Typography>
            </Box>

            {/* Right – Register Form */}
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 4,
                }}
            >
                <Card
                    sx={{
                        width: "100%",
                        maxWidth: 440,
                        border: "none",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
                    }}
                >
                    <CardContent sx={{ p: 5 }}>
                        <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
                            Create Account
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                            Fill in your details to get started
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Full Name"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                                sx={{ mb: 2.5 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Person sx={{ color: "text.secondary", fontSize: 20 }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                required
                                sx={{ mb: 2.5 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email sx={{ color: "text.secondary", fontSize: 20 }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                type={showPw ? "text" : "password"}
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                required
                                sx={{ mb: 2.5 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock sx={{ color: "text.secondary", fontSize: 20 }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPw(!showPw)} edge="end" size="small">
                                                {showPw ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                fullWidth
                                select
                                label="Role"
                                value={form.role}
                                onChange={(e) => setForm({ ...form, role: e.target.value })}
                                sx={{ mb: 3.5 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Badge sx={{ color: "text.secondary", fontSize: 20 }} />
                                        </InputAdornment>
                                    ),
                                }}
                            >
                                <MenuItem value="user">User</MenuItem>
                                <MenuItem value="staff">Staff</MenuItem>
                                <MenuItem value="admin">Admin</MenuItem>
                            </TextField>

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                size="large"
                                disabled={loading}
                                sx={{ py: 1.5, fontSize: 16, mb: 3 }}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : "Create Account"}
                            </Button>
                        </Box>

                        <Typography variant="body2" textAlign="center" color="text.secondary">
                            Already have an account?{" "}
                            <Link component={RouterLink} to="/login" underline="hover" fontWeight={600}>
                                Sign In
                            </Link>
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}
