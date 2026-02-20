import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import { animalService, adopterService } from "../../services";
import EmptyState from "../../components/EmptyState";
import ConfirmDialog from "../../components/ConfirmDialog";
import {
    Box, Typography, Card, CardContent, CardMedia, CardActions, Table, TableHead,
    TableRow, TableCell, TableBody, TableContainer, Paper, Button, TextField,
    ToggleButtonGroup, ToggleButton, Chip, InputAdornment, Fab, Skeleton,
    Grid, IconButton, alpha, useTheme, Avatar, Tooltip, Pagination,
} from "@mui/material";
import {
    ViewList, ViewModule, Search, Add, Pets, FilterList,
} from "@mui/icons-material";

export default function AnimalList() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { notify } = useNotification();
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState("card");
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [page, setPage] = useState(1);
    const PER_PAGE = 8;

    useEffect(() => {
        animalService.getAll()
            .then((res) => setAnimals(res.data || []))
            .catch(() => notify("Failed to load animals", "error"))
            .finally(() => setLoading(false));
    }, []);

    const filtered = animals.filter((a) => {
        const matchSearch =
            a.name?.toLowerCase().includes(search.toLowerCase()) ||
            a.breed?.toLowerCase().includes(search.toLowerCase());
        const matchStatus =
            statusFilter === "all" ||
            (statusFilter === "available" && !a.ad_id) ||
            (statusFilter === "adopted" && a.ad_id);
        return matchSearch && matchStatus;
    });

    const totalPages = Math.ceil(filtered.length / PER_PAGE);
    const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    if (loading) {
        return (
            <Grid container spacing={3}>
                {[1, 2, 3, 4].map((i) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                        <Skeleton variant="rounded" height={220} sx={{ borderRadius: 4 }} />
                    </Grid>
                ))}
            </Grid>
        );
    }

    return (
        <Box>
            {/* Header */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3, flexWrap: "wrap", gap: 2 }}>
                <Box>
                    <Typography variant="h4" fontWeight={700}>Animals</Typography>
                    <Typography variant="body2" color="text.secondary">{filtered.length} total</Typography>
                </Box>
                <Button variant="contained" startIcon={<Add />} onClick={() => navigate("/dashboard/animals/new")}>
                    Add Animal
                </Button>
            </Box>

            {/* Toolbar */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3, flexWrap: "wrap" }}>
                <TextField
                    size="small"
                    placeholder="Search by name or breed…"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    sx={{ minWidth: 260 }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><Search sx={{ fontSize: 20, color: "text.secondary" }} /></InputAdornment>,
                    }}
                />
                <Box sx={{ display: "flex", gap: 1 }}>
                    {["all", "available", "adopted"].map((s) => (
                        <Chip
                            key={s}
                            label={s.charAt(0).toUpperCase() + s.slice(1)}
                            variant={statusFilter === s ? "filled" : "outlined"}
                            color={statusFilter === s ? (s === "adopted" ? "secondary" : s === "available" ? "primary" : "default") : "default"}
                            onClick={() => { setStatusFilter(s); setPage(1); }}
                            sx={{ fontWeight: 500 }}
                        />
                    ))}
                </Box>
                <Box sx={{ flex: 1 }} />
                <ToggleButtonGroup size="small" value={view} exclusive onChange={(_, v) => v && setView(v)}>
                    <ToggleButton value="card"><ViewModule /></ToggleButton>
                    <ToggleButton value="table"><ViewList /></ToggleButton>
                </ToggleButtonGroup>
            </Box>

            {/* Content */}
            {filtered.length === 0 ? (
                <EmptyState
                    title="No animals found"
                    subtitle="Try adjusting your search or add a new animal."
                    action={() => navigate("/dashboard/animals/new")}
                    actionLabel="Add Animal"
                />
            ) : view === "card" ? (
                <>
                    <Grid container spacing={3}>
                        {paged.map((animal) => (
                            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={animal.anl_id}>
                                <Card
                                    sx={{
                                        cursor: "pointer", transition: "all 0.2s",
                                        "&:hover": { transform: "translateY(-4px)", boxShadow: "0 12px 32px rgba(0,0,0,0.1)" },
                                    }}
                                    onClick={() => navigate(`/dashboard/animals/${animal.anl_id}`)}
                                >
                                    <Box
                                        sx={{
                                            height: 140,
                                            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)}, ${alpha(theme.palette.secondary.main, 0.08)})`,
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                        }}
                                    >
                                        <Pets sx={{ fontSize: 48, color: "primary.main", opacity: 0.6 }} />
                                    </Box>
                                    <CardContent sx={{ p: 2.5 }}>
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                                            <Typography variant="subtitle1" fontWeight={600}>{animal.name}</Typography>
                                            <Chip
                                                label={animal.ad_id ? "Adopted" : "Available"}
                                                size="small"
                                                color={animal.ad_id ? "secondary" : "primary"}
                                                sx={{ height: 24, fontSize: 11, fontWeight: 600 }}
                                            />
                                        </Box>
                                        <Typography variant="body2" color="text.secondary">{animal.breed || "Unknown breed"}</Typography>
                                        <Typography variant="body2" color="text.secondary">Age: {animal.age || "–"}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    {totalPages > 1 && (
                        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                            <Pagination count={totalPages} page={page} onChange={(_, v) => setPage(v)} color="primary" shape="rounded" />
                        </Box>
                    )}
                </>
            ) : (
                <TableContainer component={Paper} sx={{ borderRadius: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Breed</TableCell>
                                <TableCell>Age</TableCell>
                                <TableCell>Admission Date</TableCell>
                                <TableCell>Adopter</TableCell>
                                <TableCell>Staff</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paged.map((a) => (
                                <TableRow
                                    key={a.anl_id}
                                    hover
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => navigate(`/dashboard/animals/${a.anl_id}`)}
                                >
                                    <TableCell><Typography fontWeight={500}>{a.name}</Typography></TableCell>
                                    <TableCell>{a.breed || "–"}</TableCell>
                                    <TableCell>{a.age || "–"}</TableCell>
                                    <TableCell>{a.adm_date ? new Date(a.adm_date).toLocaleDateString() : "–"}</TableCell>
                                    <TableCell>{a.adopter_name || "–"}</TableCell>
                                    <TableCell>{a.staff_name || "–"}</TableCell>
                                    <TableCell>
                                        <Chip label={a.ad_id ? "Adopted" : "Available"} size="small" color={a.ad_id ? "secondary" : "primary"} sx={{ fontWeight: 600 }} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {totalPages > 1 && (
                        <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                            <Pagination count={totalPages} page={page} onChange={(_, v) => setPage(v)} color="primary" shape="rounded" />
                        </Box>
                    )}
                </TableContainer>
            )}

            {/* FAB */}
            <Fab
                color="primary"
                sx={{ position: "fixed", bottom: 32, right: 32 }}
                onClick={() => navigate("/dashboard/animals/new")}
            >
                <Add />
            </Fab>
        </Box>
    );
}
