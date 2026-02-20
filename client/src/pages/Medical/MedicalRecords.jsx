import { useState, useEffect } from "react";
import { useNotification } from "../../context/NotificationContext";
import { medrecService, animalService } from "../../services";
import EmptyState from "../../components/EmptyState";
import {
    Box, Typography, Card, CardContent, Table, TableHead, TableRow, TableCell,
    TableBody, Paper, Button, TextField, Grid, MenuItem, Dialog, DialogTitle,
    DialogContent, DialogActions, CircularProgress, Skeleton, Chip, TableContainer,
} from "@mui/material";
import { Add, MedicalServices } from "@mui/icons-material";

export default function MedicalRecords() {
    const { notify } = useNotification();
    const [records, setRecords] = useState([]);
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [form, setForm] = useState({ vacc_det: "", treatment: "", anl_id: "" });
    const [saving, setSaving] = useState(false);

    const fetchAll = async () => {
        try {
            const [mRes, aRes] = await Promise.all([medrecService.getAll(), animalService.getAll()]);
            setRecords(mRes.data || []);
            setAnimals(aRes.data || []);
        } catch { notify("Failed to load records", "error"); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchAll(); }, []);

    const handleAdd = async () => {
        setSaving(true);
        try {
            await medrecService.create(form);
            notify("Medical record added! 🏥");
            setDialogOpen(false);
            setForm({ vacc_det: "", treatment: "", anl_id: "" });
            fetchAll();
        } catch { notify("Failed to add record", "error"); }
        finally { setSaving(false); }
    };

    if (loading) return <Skeleton variant="rounded" height={300} sx={{ borderRadius: 4 }} />;

    return (
        <Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                <Typography variant="h4" fontWeight={700}>Medical Records</Typography>
                <Button variant="contained" startIcon={<Add />} onClick={() => setDialogOpen(true)}>Add Record</Button>
            </Box>

            {records.length === 0 ? (
                <EmptyState title="No medical records" action={() => setDialogOpen(true)} actionLabel="Add Record" />
            ) : (
                <TableContainer component={Paper} sx={{ borderRadius: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Animal</TableCell>
                                <TableCell>Treatment</TableCell>
                                <TableCell>Vaccine Details</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {records.map((r) => {
                                const animal = animals.find((a) => a.anl_id === r.anl_id);
                                return (
                                    <TableRow key={r.r_id} hover>
                                        <TableCell><Typography fontWeight={500}>{animal?.name || `Animal #${r.anl_id}`}</Typography></TableCell>
                                        <TableCell>{r.treatment || "–"}</TableCell>
                                        <TableCell>{r.vacc_det || "–"}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
                <DialogTitle sx={{ fontWeight: 600 }}>
                    <MedicalServices sx={{ mr: 1, verticalAlign: "text-bottom" }} />
                    New Medical Record
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 0.5 }}>
                        <Grid size={12}>
                            <TextField fullWidth select label="Animal" value={form.anl_id} onChange={(e) => setForm({ ...form, anl_id: e.target.value })} required>
                                {animals.map((a) => <MenuItem key={a.anl_id} value={a.anl_id}>{a.name} ({a.breed || "Unknown"})</MenuItem>)}
                            </TextField>
                        </Grid>
                        <Grid size={12}><TextField fullWidth label="Treatment" value={form.treatment} onChange={(e) => setForm({ ...form, treatment: e.target.value })} /></Grid>
                        <Grid size={12}><TextField fullWidth label="Vaccine Details" value={form.vacc_det} onChange={(e) => setForm({ ...form, vacc_det: e.target.value })} /></Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={() => setDialogOpen(false)} color="inherit">Cancel</Button>
                    <Button variant="contained" onClick={handleAdd} disabled={saving}>
                        {saving ? <CircularProgress size={20} color="inherit" /> : "Save"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
