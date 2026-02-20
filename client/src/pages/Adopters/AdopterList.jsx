import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import { useAuth } from "../../context/AuthContext";
import { adopterService, adopterPhoneService } from "../../services";
import EmptyState from "../../components/EmptyState";
import ConfirmDialog from "../../components/ConfirmDialog";
import {
    Box, Typography, Table, TableHead, TableRow, TableCell,
    TableBody, Paper, Button, TextField, Grid, Chip, IconButton, Skeleton,
    InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions,
    TableContainer, Tooltip, CircularProgress,
} from "@mui/material";
import { Add, Delete, Search, Phone, Edit } from "@mui/icons-material";

export default function AdopterList() {
    const navigate = useNavigate();
    const { notify } = useNotification();
    const { user } = useAuth();
    const isAdmin = user?.role === "admin" || user?.role === "staff";
    const [adopters, setAdopters] = useState([]);
    const [phones, setPhones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [confirmDel, setConfirmDel] = useState(null);
    const [phoneDialog, setPhoneDialog] = useState({ open: false, ad_id: null, ph: "" });

    // Edit state
    const [editDialog, setEditDialog] = useState(false);
    const [editTarget, setEditTarget] = useState(null);
    const [editForm, setEditForm] = useState({ name: "", address: "" });
    const [saving, setSaving] = useState(false);

    const fetchAll = async () => {
        try {
            const [aRes, pRes] = await Promise.all([adopterService.getAll(), adopterPhoneService.getAll()]);
            setAdopters(aRes.data || []);
            setPhones(pRes.data || []);
        } catch { notify("Failed to load adopters", "error"); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchAll(); }, []);

    const openEdit = (a) => {
        setEditTarget(a);
        setEditForm({ name: a.name, address: a.address || "" });
        setEditDialog(true);
    };

    const handleEditSave = async () => {
        setSaving(true);
        try {
            await adopterService.update(editTarget.ad_id, editForm);
            notify("Adopter updated!");
            setEditDialog(false);
            fetchAll();
        } catch { notify("Failed to update adopter", "error"); }
        finally { setSaving(false); }
    };

    const handleDelete = async () => {
        try {
            await adopterService.delete(confirmDel);
            notify("Adopter deleted");
            setConfirmDel(null);
            fetchAll();
        } catch { notify("Delete failed", "error"); }
    };

    const handleAddPhone = async () => {
        try {
            await adopterPhoneService.create({ ph: phoneDialog.ph, ad_id: phoneDialog.ad_id });
            notify("Phone added");
            setPhoneDialog({ open: false, ad_id: null, ph: "" });
            fetchAll();
        } catch { notify("Failed to add phone", "error"); }
    };

    const filtered = adopters.filter((a) => a.name?.toLowerCase().includes(search.toLowerCase()));

    if (loading) return <Skeleton variant="rounded" height={300} sx={{ borderRadius: 2 }} />;

    return (
        <Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                <Typography variant="h4" fontWeight={700}>Adopters</Typography>
                {isAdmin && <Button variant="contained" startIcon={<Add />} onClick={() => navigate("/dashboard/adopters/new")}>Add Adopter</Button>}
            </Box>

            <TextField
                size="small" placeholder="Search adopters…" value={search} onChange={(e) => setSearch(e.target.value)}
                sx={{ mb: 3, minWidth: 260 }}
                InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ fontSize: 20, color: "text.secondary" }} /></InputAdornment> }}
            />

            {filtered.length === 0 ? (
                <EmptyState title="No adopters found" />
            ) : (
                <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Phone Numbers</TableCell>
                                {isAdmin && <TableCell align="right">Actions</TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filtered.map((a) => {
                                const adopterPhones = phones.filter((p) => p.ad_id === a.ad_id);
                                return (
                                    <TableRow key={a.ad_id} hover>
                                        <TableCell><Typography fontWeight={500}>{a.name}</Typography></TableCell>
                                        <TableCell>{a.address || "–"}</TableCell>
                                        <TableCell>
                                            <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                                                {adopterPhones.map((p) => (
                                                    <Chip key={p.ph} label={p.ph} size="small" icon={<Phone sx={{ fontSize: 14 }} />} sx={{ fontSize: 12 }} />
                                                ))}
                                                {isAdmin && (
                                                    <Chip
                                                        label="+ Add" size="small" variant="outlined" clickable
                                                        onClick={() => setPhoneDialog({ open: true, ad_id: a.ad_id, ph: "" })}
                                                        sx={{ fontSize: 12 }}
                                                    />
                                                )}
                                            </Box>
                                        </TableCell>
                                        {isAdmin && (
                                            <TableCell align="right">
                                                <Tooltip title="Edit">
                                                    <IconButton size="small" onClick={() => openEdit(a)}>
                                                        <Edit fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <IconButton color="error" size="small" onClick={() => setConfirmDel(a.ad_id)}>
                                                        <Delete fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Edit Adopter Dialog */}
            <Dialog open={editDialog} onClose={() => setEditDialog(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 2 } }}>
                <DialogTitle sx={{ fontWeight: 600 }}>Edit Adopter</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 0.5 }}>
                        <Grid size={12}><TextField fullWidth label="Name" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} required /></Grid>
                        <Grid size={12}><TextField fullWidth label="Address" value={editForm.address} onChange={(e) => setEditForm({ ...editForm, address: e.target.value })} /></Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={() => setEditDialog(false)} color="inherit">Cancel</Button>
                    <Button variant="contained" onClick={handleEditSave} disabled={saving}>
                        {saving ? <CircularProgress size={20} color="inherit" /> : "Update"}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation */}
            <ConfirmDialog
                open={!!confirmDel}
                title="Delete Adopter"
                message="This will remove the adopter and their phone numbers."
                onConfirm={handleDelete}
                onCancel={() => setConfirmDel(null)}
            />

            {/* Add Phone Dialog */}
            <Dialog open={phoneDialog.open} onClose={() => setPhoneDialog({ open: false, ad_id: null, ph: "" })} PaperProps={{ sx: { borderRadius: 2 } }}>
                <DialogTitle>Add Phone Number</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth autoFocus label="Phone Number" value={phoneDialog.ph}
                        onChange={(e) => setPhoneDialog({ ...phoneDialog, ph: e.target.value })}
                        sx={{ mt: 1 }}
                    />
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={() => setPhoneDialog({ open: false, ad_id: null, ph: "" })} color="inherit">Cancel</Button>
                    <Button variant="contained" onClick={handleAddPhone}>Add</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
