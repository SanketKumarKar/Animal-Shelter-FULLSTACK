import { useState, useEffect } from "react";
import { useNotification } from "../../context/NotificationContext";
import { donationService } from "../../services";
import EmptyState from "../../components/EmptyState";
import {
    Box, Typography, Card, CardContent, Table, TableHead, TableRow, TableCell,
    TableBody, Paper, Button, TextField, Grid, Dialog, DialogTitle,
    DialogContent, DialogActions, CircularProgress, Skeleton, Chip, TableContainer,
} from "@mui/material";
import { Add, VolunteerActivism, CalendarMonth } from "@mui/icons-material";

export default function DonationList() {
    const { notify } = useNotification();
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [form, setForm] = useState({ amt: "", items: "", don_date: "" });
    const [saving, setSaving] = useState(false);

    const fetchAll = async () => {
        try {
            const res = await donationService.getAll();
            setDonations(res.data || []);
        } catch { notify("Failed to load donations", "error"); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchAll(); }, []);

    const handleAdd = async () => {
        setSaving(true);
        try {
            await donationService.create({
                ...form,
                amt: Number(form.amt),
                don_date: form.don_date || new Date().toISOString().split("T")[0],
            });
            notify("Donation recorded! 💝");
            setDialogOpen(false);
            setForm({ amt: "", items: "", don_date: "" });
            fetchAll();
        } catch { notify("Failed to add donation", "error"); }
        finally { setSaving(false); }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "–";
        return new Date(dateStr).toLocaleDateString("en-IN", {
            day: "2-digit", month: "short", year: "numeric",
        });
    };

    if (loading) return <Skeleton variant="rounded" height={300} sx={{ borderRadius: 4 }} />;

    const totalDonations = donations.reduce((sum, d) => sum + (d.amt || 0), 0);

    return (
        <Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                <Box>
                    <Typography variant="h4" fontWeight={700}>Donations</Typography>
                    <Typography variant="body2" color="text.secondary">Total: ₹{totalDonations.toLocaleString()}</Typography>
                </Box>
                <Button variant="contained" startIcon={<Add />} onClick={() => setDialogOpen(true)}>Add Donation</Button>
            </Box>

            {donations.length === 0 ? (
                <EmptyState title="No donations yet" action={() => setDialogOpen(true)} actionLabel="Add Donation" />
            ) : (
                <TableContainer component={Paper} sx={{ borderRadius: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Items</TableCell>
                                <TableCell>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {donations.map((d) => (
                                <TableRow key={d.d_id} hover>
                                    <TableCell>#{d.d_id}</TableCell>
                                    <TableCell>
                                        <Chip label={`₹${d.amt?.toLocaleString()}`} color="secondary" size="small" sx={{ fontWeight: 600 }} />
                                    </TableCell>
                                    <TableCell>{d.items || "–"}</TableCell>
                                    <TableCell>
                                        <Chip
                                            icon={<CalendarMonth sx={{ fontSize: 16 }} />}
                                            label={formatDate(d.don_date)}
                                            variant="outlined"
                                            size="small"
                                            sx={{ fontWeight: 500 }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
                <DialogTitle sx={{ fontWeight: 600 }}>
                    <VolunteerActivism sx={{ mr: 1, verticalAlign: "text-bottom" }} />
                    New Donation
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 0.5 }}>
                        <Grid size={12}><TextField fullWidth label="Amount (₹)" type="number" value={form.amt} onChange={(e) => setForm({ ...form, amt: e.target.value })} required /></Grid>
                        <Grid size={12}><TextField fullWidth label="Items / Description" value={form.items} onChange={(e) => setForm({ ...form, items: e.target.value })} /></Grid>
                        <Grid size={12}>
                            <TextField
                                fullWidth
                                label="Donation Date"
                                type="date"
                                value={form.don_date}
                                onChange={(e) => setForm({ ...form, don_date: e.target.value })}
                                slotProps={{ inputLabel: { shrink: true } }}
                            />
                        </Grid>
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
