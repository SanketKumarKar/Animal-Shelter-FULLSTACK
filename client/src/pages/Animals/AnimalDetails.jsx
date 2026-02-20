import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { animalService, medrecService } from "../../services";
import {
    Box, Card, CardContent, Typography, Grid, Chip, Button, Avatar, Divider,
    alpha, useTheme, Skeleton, Paper,
} from "@mui/material";
import { ArrowBack, Pets, MedicalServices, CalendarToday, Person } from "@mui/icons-material";

// Simple vertical timeline since MUI Lab may not be installed
function MedicalTimeline({ records }) {
    if (!records.length) {
        return (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", py: 4 }}>
                No medical records yet
            </Typography>
        );
    }
    return (
        <Box sx={{ pl: 2 }}>
            {records.map((r, i) => (
                <Box key={r.r_id} sx={{ display: "flex", gap: 2, mb: 3, position: "relative" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Box
                            sx={{
                                width: 12, height: 12, borderRadius: "50%",
                                bgcolor: "primary.main", mt: 0.5, flexShrink: 0,
                            }}
                        />
                        {i < records.length - 1 && (
                            <Box sx={{ width: 2, flex: 1, bgcolor: "divider", mt: 0.5 }} />
                        )}
                    </Box>
                    <Paper
                        variant="outlined"
                        sx={{ flex: 1, p: 2, borderRadius: 3, "&:hover": { bgcolor: alpha("#4F46E5", 0.02) } }}
                    >
                        <Typography variant="subtitle2" fontWeight={600}>
                            <MedicalServices sx={{ fontSize: 16, mr: 0.5, verticalAlign: "text-bottom" }} />
                            {r.treatment || "Treatment"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            Vaccine: {r.vacc_det || "–"}
                        </Typography>
                    </Paper>
                </Box>
            ))}
        </Box>
    );
}

export default function AnimalDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const [animal, setAnimal] = useState(null);
    const [medRecs, setMedRecs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const [animalsRes, medRes] = await Promise.all([
                    animalService.getAll(),
                    medrecService.getAll(),
                ]);
                const found = animalsRes.data?.find((a) => String(a.anl_id) === String(id));
                setAnimal(found || null);
                setMedRecs((medRes.data || []).filter((r) => String(r.anl_id) === String(id)));
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [id]);

    if (loading) return <Skeleton variant="rounded" height={400} sx={{ borderRadius: 4 }} />;
    if (!animal) return <Typography>Animal not found</Typography>;

    return (
        <Box>
            <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mb: 2, color: "text.secondary" }}>
                Back
            </Button>

            <Grid container spacing={3}>
                {/* Profile Card */}
                <Grid size={{ xs: 12, md: 5 }}>
                    <Card>
                        <Box
                            sx={{
                                height: 200,
                                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Pets sx={{ fontSize: 80, color: "primary.main", opacity: 0.5 }} />
                        </Box>
                        <CardContent sx={{ p: 3, textAlign: "center" }}>
                            <Typography variant="h5" fontWeight={700} sx={{ mb: 0.5 }}>{animal.name}</Typography>
                            <Chip
                                label={animal.ad_id ? "Adopted" : "Available"}
                                color={animal.ad_id ? "secondary" : "primary"}
                                sx={{ fontWeight: 600, mb: 2 }}
                            />
                            <Divider sx={{ my: 2 }} />
                            <Grid container spacing={2} textAlign="left">
                                <Grid size={6}>
                                    <Typography variant="caption" color="text.secondary">Breed</Typography>
                                    <Typography variant="body2" fontWeight={500}>{animal.breed || "Unknown"}</Typography>
                                </Grid>
                                <Grid size={6}>
                                    <Typography variant="caption" color="text.secondary">Age</Typography>
                                    <Typography variant="body2" fontWeight={500}>{animal.age || "–"} years</Typography>
                                </Grid>
                                <Grid size={6}>
                                    <Typography variant="caption" color="text.secondary">Admission</Typography>
                                    <Typography variant="body2" fontWeight={500}>
                                        {animal.adm_date ? new Date(animal.adm_date).toLocaleDateString() : "–"}
                                    </Typography>
                                </Grid>
                                <Grid size={6}>
                                    <Typography variant="caption" color="text.secondary">Staff</Typography>
                                    <Typography variant="body2" fontWeight={500}>{animal.staff_name || "–"}</Typography>
                                </Grid>
                                {animal.adopter_name && (
                                    <Grid size={12}>
                                        <Typography variant="caption" color="text.secondary">Adopter</Typography>
                                        <Typography variant="body2" fontWeight={500}>{animal.adopter_name}</Typography>
                                    </Grid>
                                )}
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Medical Records Timeline */}
                <Grid size={{ xs: 12, md: 7 }}>
                    <Card sx={{ height: "100%" }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                                <MedicalServices sx={{ mr: 1, verticalAlign: "text-bottom" }} />
                                Medical History
                            </Typography>
                            <MedicalTimeline records={medRecs} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
