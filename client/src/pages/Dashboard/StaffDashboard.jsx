import { Typography, Box, Card, CardContent, Grid, Avatar, alpha, useTheme } from "@mui/material";
import { Pets, MedicalServices, People } from "@mui/icons-material";

export default function StaffDashboard() {
    const theme = useTheme();
    const cards = [
        { icon: <Pets />, label: "My Animals", value: "–", color: "#4F46E5" },
        { icon: <MedicalServices />, label: "Pending Checkups", value: "–", color: "#F59E0B" },
        { icon: <People />, label: "Today's Adopters", value: "–", color: "#10B981" },
    ];

    return (
        <Box>
            <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>Staff Dashboard</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Your assigned tasks at a glance
            </Typography>
            <Grid container spacing={3}>
                {cards.map((c) => (
                    <Grid size={{ xs: 12, sm: 4 }} key={c.label}>
                        <Card>
                            <CardContent sx={{ p: 3, display: "flex", alignItems: "center", gap: 2.5 }}>
                                <Avatar sx={{ width: 52, height: 52, bgcolor: alpha(c.color, 0.1), color: c.color }}>{c.icon}</Avatar>
                                <Box>
                                    <Typography variant="body2" color="text.secondary" fontWeight={500}>{c.label}</Typography>
                                    <Typography variant="h4" fontWeight={700}>{c.value}</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
