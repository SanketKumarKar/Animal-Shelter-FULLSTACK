import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import { staffService } from "../../services";
import { Box, Card, CardContent, Typography, TextField, Button, Grid, CircularProgress } from "@mui/material";
import { ArrowBack, PersonAdd } from "@mui/icons-material";

export default function StaffForm() {
    const navigate = useNavigate();
    const { notify } = useNotification();
    const [form, setForm] = useState({ name: "", role: "" });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await staffService.create(form);
            notify("Staff member added!");
            navigate("/dashboard/staff");
        } catch { notify("Failed to add staff", "error"); }
        finally { setLoading(false); }
    };

    return (
        <Box>
            <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mb: 2, color: "text.secondary" }}>Back</Button>
            <Card sx={{ maxWidth: 600, mx: "auto" }}>
                <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
                        <Box sx={{ width: 48, height: 48, borderRadius: 3, background: "linear-gradient(135deg, #3B82F6, #2563EB)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <PersonAdd sx={{ color: "white" }} />
                        </Box>
                        <Box>
                            <Typography variant="h5" fontWeight={700}>Add New Staff</Typography>
                            <Typography variant="body2" color="text.secondary">Register a new staff member</Typography>
                        </Box>
                    </Box>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={2.5}>
                            <Grid size={12}><TextField fullWidth label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></Grid>
                            <Grid size={12}><TextField fullWidth label="Role" placeholder="e.g., Caretaker, Vet" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required /></Grid>
                            <Grid size={12}>
                                <Button type="submit" variant="contained" fullWidth size="large" disabled={loading} sx={{ py: 1.5 }}>
                                    {loading ? <CircularProgress size={24} color="inherit" /> : "Add Staff"}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
