import { Typography, Box, Card, CardContent, Grid, Avatar, alpha, Button } from "@mui/material";
import { Pets, Favorite } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
    const navigate = useNavigate();
    return (
        <Box>
            <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>Welcome! 🐾</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Find your perfect companion today
            </Typography>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Card>
                        <CardContent sx={{ p: 4, textAlign: "center" }}>
                            <Avatar sx={{ width: 64, height: 64, mx: "auto", mb: 2, bgcolor: alpha("#4F46E5", 0.1), color: "#4F46E5" }}>
                                <Pets sx={{ fontSize: 32 }} />
                            </Avatar>
                            <Typography variant="h6" fontWeight={600}>Browse Animals</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                View all available pets looking for a forever home
                            </Typography>
                            <Button variant="contained" onClick={() => navigate("/dashboard/animals")}>View Animals</Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Card>
                        <CardContent sx={{ p: 4, textAlign: "center" }}>
                            <Avatar sx={{ width: 64, height: 64, mx: "auto", mb: 2, bgcolor: alpha("#EF4444", 0.1), color: "#EF4444" }}>
                                <Favorite sx={{ fontSize: 32 }} />
                            </Avatar>
                            <Typography variant="h6" fontWeight={600}>Your Adoptions</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Track your adoption applications and status
                            </Typography>
                            <Button variant="outlined" onClick={() => navigate("/dashboard/adopters")}>View Adopters</Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
