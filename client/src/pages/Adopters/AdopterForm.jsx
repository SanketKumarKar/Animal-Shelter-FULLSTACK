import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import { adopterService } from "../../services";
import {
    Box, Card, CardContent, Typography, TextField, Button, Grid, CircularProgress,
} from "@mui/material";
import { ArrowBack, People } from "@mui/icons-material";

export default function AdopterForm() {
    const navigate = useNavigate();
    const { notify } = useNotification();
    const [form, setForm] = useState({ name: "", address: "" });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await adopterService.create(form);
            notify("Adopter added successfully!");
            navigate("/dashboard/adopters");
        } catch { notify("Failed to add adopter", "error"); }
        finally { setLoading(false); }
    };

    return (
        <Box>
            <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mb: 2, color: "text.secondary" }}>Back</Button>
            <Card sx={{ maxWidth: 600, mx: "auto" }}>
                <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
                        <Box sx={{ width: 48, height: 48, borderRadius: 3, background: "linear-gradient(135deg, #10B981, #059669)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <People sx={{ color: "white" }} />
                        </Box>
                        <Box>
                            <Typography variant="h5" fontWeight={700}>Add New Adopter</Typography>
                            <Typography variant="body2" color="text.secondary">Register a new adopter</Typography>
                        </Box>
                    </Box>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={2.5}>
                            <Grid size={12}><TextField fullWidth label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></Grid>
                            <Grid size={12}><TextField fullWidth label="Address" multiline rows={3} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required /></Grid>
                            <Grid size={12}>
                                <Button type="submit" variant="contained" fullWidth size="large" disabled={loading} sx={{ py: 1.5 }}>
                                    {loading ? <CircularProgress size={24} color="inherit" /> : "Add Adopter"}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
