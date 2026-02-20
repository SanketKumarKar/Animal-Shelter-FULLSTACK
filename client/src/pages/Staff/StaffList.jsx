import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import { staffService } from "../../services";
import EmptyState from "../../components/EmptyState";
import ConfirmDialog from "../../components/ConfirmDialog";
import {
    Box, Typography, Table, TableHead, TableRow, TableCell, TableBody,
    Paper, Button, Skeleton, Chip, TableContainer, IconButton, Tooltip,
    Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, CircularProgress,
} from "@mui/material";
import { Add, Edit, Delete, Badge } from "@mui/icons-material";

export default function StaffList() {
    const navigate = useNavigate();
    const { notify } = useNotification();
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editTarget, setEditTarget] = useState(null);
    const [form, setForm] = useState({ name: "", role: "" });
    const [saving, setSaving] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const fetchAll = () => {
        staffService.getAll()
            .then((r) => setStaff(r.data || []))
            .catch(() => notify("Failed to load staff", "error"))
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchAll(); }, []);

    const openAdd = () => {
        setEditTarget(null);
        setForm({ name: "", role: "" });
        setDialogOpen(true);
    };

    const openEdit = (s) => {
        setEditTarget(s);
        setForm({ name: s.name, role: s.role });
        setDialogOpen(true);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            if (editTarget) {
                await staffService.update(editTarget.stff_id, form);
                notify("Staff updated!");
            } else {
                await staffService.create(form);
                notify("Staff added! 👤");
            }
            setDialogOpen(false);
            fetchAll();
        } catch { notify("Failed to save staff", "error"); }
        finally { setSaving(false); }
    };

    const handleDelete = async () => {
        try {
            await staffService.delete(deleteTarget.stff_id);
            notify("Staff removed");
            setDeleteTarget(null);
            fetchAll();
        } catch { notify("Failed to delete staff", "error"); }
    };

    if (loading) return <Skeleton variant="rounded" height={300} sx={{ borderRadius: 2 }} />;

    return (
        <Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                <Typography variant="h4" fontWeight={700}>Staff</Typography>
                <Button variant="contained" startIcon={<Add />} onClick={openAdd}>Add Staff</Button>
            </Box>

            {staff.length === 0 ? (
                <EmptyState title="No staff members" action={openAdd} actionLabel="Add Staff" />
            ) : (
                <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {staff.map((s) => (
                                <TableRow key={s.stff_id} hover>
                                    <TableCell><Typography fontWeight={500}>{s.name}</Typography></TableCell>
                                    <TableCell><Chip label={s.role} size="small" sx={{ fontWeight: 500 }} /></TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Edit">
                                            <IconButton size="small" onClick={() => openEdit(s)}>
                                                <Edit fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton color="error" size="small" onClick={() => setDeleteTarget(s)}>
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
                    <Badge sx={{ mr: 1, verticalAlign: "text-bottom" }} />
                    {editTarget ? "Edit Staff" : "New Staff Member"}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 0.5 }}>
                        <Grid size={12}><TextField fullWidth label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></Grid>
                        <Grid size={12}><TextField fullWidth label="Role" placeholder="e.g., Caretaker, Vet, Manager" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required /></Grid>
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
                title="Delete Staff"
                message={`Are you sure you want to remove "${deleteTarget?.name}"?`}
                onConfirm={handleDelete}
                onCancel={() => setDeleteTarget(null)}
            />
        </Box>
    );
}
