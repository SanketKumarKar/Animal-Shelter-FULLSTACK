import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import { animalService, adopterService, staffService } from "../../services";
import {
    Box, Card, CardContent, Typography, TextField, Button, Grid, MenuItem,
    CircularProgress, InputAdornment,
} from "@mui/material";
import { Pets, ArrowBack } from "@mui/icons-material";

export default function AnimalForm() {
    const navigate = useNavigate();
    const { notify } = useNotification();
    const [form, setForm] = useState({ name: "", age: "", breed: "", adm_date: "", ad_id: "", stff_id: "" });
    const [adopters, setAdopters] = useState([]);
    const [staffList, setStaffList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        adopterService.getAll().then((r) => setAdopters(r.data || [])).catch(() => { });
        staffService.getAll().then((r) => setStaffList(r.data || [])).catch(() => { });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await animalService.create({
                ...form,
                age: form.age ? Number(form.age) : null,
                ad_id: form.ad_id || null,
                stff_id: form.stff_id || null,
            });
            notify("Animal added successfully! 🐾");
            navigate("/dashboard/animals");
        } catch (err) {
            notify(err.response?.data?.error || "Failed to add animal", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mb: 2, color: "text.secondary" }}>
                Back
            </Button>
            <Card sx={{ maxWidth: 700, mx: "auto" }}>
                <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
                        <Box
                            sx={{
                                width: 48, height: 48, borderRadius: 3,
                                background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                            }}
                        >
                            <Pets sx={{ color: "white" }} />
                        </Box>
                        <Box>
                            <Typography variant="h5" fontWeight={700}>Add New Animal</Typography>
                            <Typography variant="body2" color="text.secondary">Fill in the details below</Typography>
                        </Box>
                    </Box>

                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={2.5}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField fullWidth label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField fullWidth label="Breed" value={form.breed} onChange={(e) => setForm({ ...form, breed: e.target.value })} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField fullWidth label="Age" type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Admission Date"
                                    type="date"
                                    value={form.adm_date}
                                    onChange={(e) => setForm({ ...form, adm_date: e.target.value })}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField fullWidth select label="Assigned Staff" value={form.stff_id} onChange={(e) => setForm({ ...form, stff_id: e.target.value })}>
                                    <MenuItem value="">None</MenuItem>
                                    {staffList.map((s) => (
                                        <MenuItem key={s.stff_id} value={s.stff_id}>{s.name} – {s.role}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField fullWidth select label="Adopter" value={form.ad_id} onChange={(e) => setForm({ ...form, ad_id: e.target.value })}>
                                    <MenuItem value="">None</MenuItem>
                                    {adopters.map((a) => (
                                        <MenuItem key={a.ad_id} value={a.ad_id}>{a.name}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid size={12}>
                                <Button type="submit" variant="contained" size="large" fullWidth disabled={loading} sx={{ py: 1.5 }}>
                                    {loading ? <CircularProgress size={24} color="inherit" /> : "Add Animal"}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
