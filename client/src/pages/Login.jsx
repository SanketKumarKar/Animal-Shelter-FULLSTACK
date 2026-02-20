import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import {
    Box, Card, CardContent, TextField, Button, Typography, InputAdornment,
    IconButton, Link, CircularProgress, alpha,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock, Pets } from "@mui/icons-material";

export default function Login() {
    const { login } = useAuth();
    const { notify } = useNotification();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(form.email, form.password);
            notify("Welcome back! 🎉");
            navigate("/dashboard");
        } catch (err) {
            notify(err.response?.data?.message || "Login failed", "error");
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
                    background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
                    color: "white",
                    p: 6,
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <Box sx={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.08)" }} />
                <Box sx={{ position: "absolute", bottom: -60, left: -60, width: 300, height: 300, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.05)" }} />
                <Pets sx={{ fontSize: 80, mb: 3, opacity: 0.9 }} />
                <Typography variant="h3" fontWeight={700} sx={{ mb: 2, textAlign: "center" }}>
                    PawShelter
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.85, textAlign: "center", maxWidth: 380 }}>
                    Manage your shelter with love and efficiency. Every paw deserves a home.
                </Typography>
            </Box>

            {/* Right – Login Form */}
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
                            Welcome Back
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                            Sign in to continue managing your shelter
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit}>
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
                                sx={{ mb: 3.5 }}
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
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                size="large"
                                disabled={loading}
                                sx={{ py: 1.5, fontSize: 16, mb: 3 }}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
                            </Button>
                        </Box>

                        <Typography variant="body2" textAlign="center" color="text.secondary">
                            Don't have an account?{" "}
                            <Link component={RouterLink} to="/register" underline="hover" fontWeight={600}>
                                Create Account
                            </Link>
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}
