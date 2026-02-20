import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
    Box, Card, CardContent, Typography, Grid, Skeleton, alpha, Avatar, List, ListItem,
    ListItemAvatar, ListItemText, Chip, IconButton, useTheme,
} from "@mui/material";
import {
    Pets, People, VolunteerActivism, Handshake, TrendingUp, ArrowForward,
    CheckCircle, FiberNew, MedicalServices,
} from "@mui/icons-material";
import {
    AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { animalService, adopterService, donationService, volunteerService } from "../../services";

const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#3B82F6", "#8B5CF6"];

// Sample chart data (would come from API in production)
const adoptionTrend = [
    { month: "Jan", adoptions: 4 }, { month: "Feb", adoptions: 7 },
    { month: "Mar", adoptions: 5 }, { month: "Apr", adoptions: 9 },
    { month: "May", adoptions: 12 }, { month: "Jun", adoptions: 8 },
    { month: "Jul", adoptions: 15 }, { month: "Aug", adoptions: 11 },
];



function StatCard({ icon, label, value, color, trend }) {
    const theme = useTheme();
    return (
        <Card sx={{ height: "100%" }}>
            <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                    <Box>
                        <Typography variant="body2" color="text.secondary" fontWeight={500} sx={{ mb: 1 }}>
                            {label}
                        </Typography>
                        <Typography variant="h4" fontWeight={700}>{value}</Typography>
                        {trend && (
                            <Chip
                                icon={<TrendingUp sx={{ fontSize: 14 }} />}
                                label={trend}
                                size="small"
                                sx={{
                                    mt: 1.5, height: 24, fontSize: 12, fontWeight: 600,
                                    bgcolor: alpha(theme.palette.secondary.main, 0.1),
                                    color: "secondary.main",
                                }}
                            />
                        )}
                    </Box>
                    <Avatar
                        sx={{
                            width: 52, height: 52,
                            bgcolor: alpha(color, 0.1),
                            color: color,
                        }}
                    >
                        {icon}
                    </Avatar>
                </Box>
            </CardContent>
        </Card>
    );
}

export default function AdminDashboard() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [stats, setStats] = useState({ animals: 0, adopters: 0, donations: 0, volunteers: 0 });
    const [animals, setAnimals] = useState([]);
    const [donationGrowth, setDonationGrowth] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [animalsRes, adoptersRes, donationsRes, volunteersRes, growthRes] = await Promise.all([
                    animalService.getAll(),
                    adopterService.getAll(),
                    donationService.getAll(),
                    volunteerService.getAll(),
                    donationService.getGrowth(),
                ]);
                setAnimals(animalsRes.data || []);
                setDonationGrowth(
                    (growthRes.data || []).map((d) => ({ month: d.month, amount: Number(d.amount) }))
                );
                setStats({
                    animals: animalsRes.data?.length || 0,
                    adopters: adoptersRes.data?.length || 0,
                    donations: donationsRes.data?.length || 0,
                    volunteers: volunteersRes.data?.length || 0,
                });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const statusData = [
        { name: "Available", value: animals.filter((a) => !a.ad_id).length },
        { name: "Adopted", value: animals.filter((a) => a.ad_id).length },
    ];

    if (loading) {
        return (
            <Box>
                <Grid container spacing={3}>
                    {[1, 2, 3, 4].map((i) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                            <Skeleton variant="rounded" height={140} sx={{ borderRadius: 4 }} />
                        </Grid>
                    ))}
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Skeleton variant="rounded" height={340} sx={{ borderRadius: 4 }} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Skeleton variant="rounded" height={340} sx={{ borderRadius: 4 }} />
                    </Grid>
                </Grid>
            </Box>
        );
    }

    return (
        <Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
                <Box>
                    <Typography variant="h4" fontWeight={700}>Dashboard</Typography>
                    <Typography variant="body2" color="text.secondary">Welcome back! Here's what's happening.</Typography>
                </Box>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard icon={<Pets />} label="Total Animals" value={stats.animals} color="#4F46E5" trend="+12% this month" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard icon={<People />} label="Total Adopters" value={stats.adopters} color="#10B981" trend="+8% this month" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard icon={<VolunteerActivism />} label="Donations" value={stats.donations} color="#F59E0B" trend="+23% this month" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard icon={<Handshake />} label="Volunteers" value={stats.volunteers} color="#8B5CF6" />
                </Grid>
            </Grid>

            {/* Charts */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {/* Adoption Trends */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <Card>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>Monthly Adoptions</Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={adoptionTrend}>
                                    <defs>
                                        <linearGradient id="colorAdoptions" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.15} />
                                            <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                                    <XAxis dataKey="month" stroke={theme.palette.text.secondary} fontSize={12} />
                                    <YAxis stroke={theme.palette.text.secondary} fontSize={12} />
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: 12, border: "none",
                                            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                                            backgroundColor: theme.palette.background.paper,
                                        }}
                                    />
                                    <Area type="monotone" dataKey="adoptions" stroke="#4F46E5" strokeWidth={2.5} fill="url(#colorAdoptions)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Animal Status Pie */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{ height: "100%" }}>
                        <CardContent sx={{ p: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Typography variant="h6" fontWeight={600} sx={{ mb: 2, alignSelf: "flex-start" }}>Animal Status</Typography>
                            <ResponsiveContainer width="100%" height={240}>
                                <PieChart>
                                    <Pie
                                        data={statusData}
                                        cx="50%" cy="50%"
                                        innerRadius={60} outerRadius={90}
                                        paddingAngle={4}
                                        dataKey="value"
                                    >
                                        {statusData.map((_, i) => (
                                            <Cell key={i} fill={COLORS[i]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Donation Growth + Recent Activity */}
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 7 }}>
                    <Card>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>Donation Growth</Typography>
                            <ResponsiveContainer width="100%" height={280}>
                                <BarChart data={donationGrowth}>
                                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                                    <XAxis dataKey="month" stroke={theme.palette.text.secondary} fontSize={12} />
                                    <YAxis stroke={theme.palette.text.secondary} fontSize={12} />
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: 12, border: "none",
                                            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                                            backgroundColor: theme.palette.background.paper,
                                        }}
                                    />
                                    <Bar dataKey="amount" fill="#10B981" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Activity Feed */}
                <Grid size={{ xs: 12, md: 5 }}>
                    <Card sx={{ height: "100%" }}>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                                <Typography variant="h6" fontWeight={600}>Recent Activity</Typography>
                                <IconButton size="small"><ArrowForward fontSize="small" /></IconButton>
                            </Box>
                            <List disablePadding>
                                {[
                                    { icon: <FiberNew />, text: "New animal registered", sub: "Tommy – Labrador", color: "#4F46E5" },
                                    { icon: <CheckCircle />, text: "Adoption completed", sub: "Buddy found a home", color: "#10B981" },
                                    { icon: <MedicalServices />, text: "Medical checkup done", sub: "Rabies vaccine – Max", color: "#F59E0B" },
                                    { icon: <VolunteerActivism />, text: "Donation received", sub: "₹5,000 – Dog Food", color: "#8B5CF6" },
                                ].map((item, i) => (
                                    <ListItem key={i} disablePadding sx={{ py: 1.2 }}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: alpha(item.color, 0.1), color: item.color, width: 40, height: 40 }}>
                                                {item.icon}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={item.text}
                                            secondary={item.sub}
                                            primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}
                                            secondaryTypographyProps={{ fontSize: 12 }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
