import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box, Container, Typography, Grid, Card, CardContent, Chip, TextField,
    InputAdornment, Skeleton, Button, alpha, useTheme,
} from "@mui/material";
import { Search, Pets, ArrowBack } from "@mui/icons-material";
import API from "../services/api";

export default function PublicAnimals() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        // Fetch animals without auth for public route — if backend requires auth,
        // this will fail gracefully and show an empty state
        API.get("/animals/public")  
            .then((res) => setAnimals((res.data || []).filter((a) => !a.ad_id)))
            .catch(() => setAnimals([]))
            .finally(() => setLoading(false));
    }, []);

    const filtered = animals.filter(
        (a) =>
            a.name?.toLowerCase().includes(search.toLowerCase()) ||
            a.breed?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 4 }}>
            <Container maxWidth="lg">
                <Button startIcon={<ArrowBack />} onClick={() => navigate("/")} sx={{ mb: 2, color: "text.secondary" }}>
                    Home
                </Button>
                <Box sx={{ textAlign: "center", mb: 5 }}>
                    <Typography variant="h3" fontWeight={700} sx={{ mb: 1 }}>
                        Available Pets
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        Meet our adorable animals waiting for a loving home
                    </Typography>
                    <TextField
                        size="small"
                        placeholder="Search by name or breed…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{ maxWidth: 400, width: "100%" }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search sx={{ fontSize: 20, color: "text.secondary" }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                {loading ? (
                    <Grid container spacing={3}>
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                                <Skeleton variant="rounded" height={240} sx={{ borderRadius: 4 }} />
                            </Grid>
                        ))}
                    </Grid>
                ) : filtered.length === 0 ? (
                    <Box sx={{ textAlign: "center", py: 8 }}>
                        <Pets sx={{ fontSize: 64, color: "text.secondary", opacity: 0.3 }} />
                        <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>No animals available right now</Typography>
                        <Button variant="contained" onClick={() => navigate("/register")} sx={{ mt: 3 }}>
                            Register to Stay Updated
                        </Button>
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {filtered.map((animal) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={animal.anl_id}>
                                <Card
                                    sx={{
                                        transition: "all 0.2s",
                                        "&:hover": { transform: "translateY(-4px)", boxShadow: "0 12px 32px rgba(0,0,0,0.1)" },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            height: 160,
                                            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)}, ${alpha(theme.palette.secondary.main, 0.08)})`,
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                        }}
                                    >
                                        <Pets sx={{ fontSize: 56, color: "primary.main", opacity: 0.5 }} />
                                    </Box>
                                    <CardContent sx={{ p: 3 }}>
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                                            <Typography variant="h6" fontWeight={600}>{animal.name}</Typography>
                                            <Chip label="Available" color="primary" size="small" sx={{ fontWeight: 600 }} />
                                        </Box>
                                        <Typography variant="body2" color="text.secondary">Breed: {animal.breed || "Unknown"}</Typography>
                                        <Typography variant="body2" color="text.secondary">Age: {animal.age || "–"} years</Typography>
                                        <Button
                                            fullWidth variant="outlined" sx={{ mt: 2 }}
                                            onClick={() => navigate("/register")}
                                        >
                                            Adopt Me ❤️
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    );
}
