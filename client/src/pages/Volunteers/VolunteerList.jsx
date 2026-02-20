import { useState, useEffect } from "react";
import { useNotification } from "../../context/NotificationContext";
import { volunteerService, donationService } from "../../services";
import EmptyState from "../../components/EmptyState";
import ConfirmDialog from "../../components/ConfirmDialog";
import {
    Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper,
    Button, TextField, Grid, MenuItem, Dialog, DialogTitle, DialogContent,
    DialogActions, CircularProgress, Skeleton, Chip, TableContainer, IconButton, Tooltip,
} from "@mui/material";
import { Add, Handshake, Delete, Edit } from "@mui/icons-material";

export default function VolunteerList() {
    const { notify } = useNotification();
    const [volunteers, setVolunteers] = useState([]);
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editTarget, setEditTarget] = useState(null);
    const [form, setForm] = useState({ name: "", role: "", d_id: "" });
    const [saving, setSaving] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const fetchAll = async () => {
        try {
            const [vRes, dRes] = await Promise.all([volunteerService.getAll(), donationService.getAll()]);
            setVolunteers(vRes.data || []);
            setDonations(dRes.data || []);
        } catch { notify("Failed to load volunteers", "error"); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchAll(); }, []);

    const openAdd = () => {
        setEditTarget(null);
        setForm({ name: "", role: "", d_id: "" });
        setDialogOpen(true);
    };

    const openEdit = (v) => {
        setEditTarget(v);
        setForm({ name: v.name, role: v.role, d_id: v.d_id || "" });
        setDialogOpen(true);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            if (editTarget) {
                await volunteerService.update(editTarget.v_id, { ...form, d_id: form.d_id || null });
                notify("Volunteer updated!");
            } else {
                await volunteerService.create({ ...form, d_id: form.d_id || null });
                notify("Volunteer added! 🤝");
            }
            setDialogOpen(false);
            fetchAll();
        } catch { notify("Failed to save volunteer", "error"); }
        finally { setSaving(false); }
    };

    const handleDelete = async () => {
        try {
            await volunteerService.delete(deleteTarget.v_id);
            notify("Volunteer removed");
            setDeleteTarget(null);
            fetchAll();
        } catch { notify("Failed to delete volunteer", "error"); }
    };

    if (loading) return <Skeleton variant="rounded" height={300} sx={{ borderRadius: 2 }} />;

    return (
        <Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                <Typography variant="h4" fontWeight={700}>Volunteers</Typography>
                <Button variant="contained" startIcon={<Add />} onClick={openAdd}>Add Volunteer</Button>
            </Box>

            {volunteers.length === 0 ? (
                <EmptyState title="No volunteers yet" action={openAdd} actionLabel="Add Volunteer" />
            ) : (
                <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Linked Donation</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {volunteers.map((v) => (
                                <TableRow key={v.v_id} hover>
                                    <TableCell><Typography fontWeight={500}>{v.name}</Typography></TableCell>
                                    <TableCell><Chip label={v.role} size="small" sx={{ fontWeight: 500 }} /></TableCell>
                                    <TableCell>{v.d_id ? `Donation #${v.d_id}` : "–"}</TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Edit">
                                            <IconButton size="small" onClick={() => openEdit(v)}>
                                                <Edit fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton color="error" size="small" onClick={() => setDeleteTarget(v)}>
                                                <Delete fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 2 } }}>
                <DialogTitle sx={{ fontWeight: 600 }}>
                    <Handshake sx={{ mr: 1, verticalAlign: "text-bottom" }} />
                    {editTarget ? "Edit Volunteer" : "New Volunteer"}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 0.5 }}>
                        <Grid size={12}><TextField fullWidth label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></Grid>
                        <Grid size={12}><TextField fullWidth label="Role" placeholder="e.g., Helper, Walker" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required /></Grid>
                        <Grid size={12}>
                            <TextField fullWidth select label="Linked Donation (optional)" value={form.d_id} onChange={(e) => setForm({ ...form, d_id: e.target.value })}>
                                <MenuItem value="">None</MenuItem>
                                {donations.map((d) => <MenuItem key={d.d_id} value={d.d_id}>#{d.d_id} – ₹{d.amt}</MenuItem>)}
                            </TextField>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={() => setDialogOpen(false)} color="inherit">Cancel</Button>
                    <Button variant="contained" onClick={handleSave} disabled={saving}>
                        {saving ? <CircularProgress size={20} color="inherit" /> : editTarget ? "Update" : "Save"}
                    </Button>
                </DialogActions>
            </Dialog>

            <ConfirmDialog
                open={Boolean(deleteTarget)}
                title="Delete Volunteer"
                message={`Are you sure you want to remove "${deleteTarget?.name}"?`}
                onConfirm={handleDelete}
                onCancel={() => setDeleteTarget(null)}
            />
        </Box>
    );
}
