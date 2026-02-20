import { useNavigate } from "react-router-dom";
import {
    Box, Typography, Button, Grid, Card, CardContent, Container, Avatar,
    alpha, useTheme, Divider, IconButton,
} from "@mui/material";
import {
    Pets, Favorite, VerifiedUser, MedicalServices, ArrowForward,
    Security, Speed, EmojiPeople, Facebook, Twitter, Instagram,
    CheckCircle, KeyboardArrowRight,
} from "@mui/icons-material";

const features = [
    { icon: <Speed />, title: "Easy Adoption", desc: "Streamlined adoption process that matches you with your perfect companion in just a few steps." },
    { icon: <MedicalServices />, title: "Medical Verified", desc: "All animals receive complete medical checkups, vaccinations, and health clearance before adoption." },
    { icon: <Security />, title: "Trusted Shelter", desc: "Licensed and certified shelter with years of experience in animal care and welfare." },
    { icon: <VerifiedUser />, title: "Post-Adoption Support", desc: "Ongoing guidance and support after adoption to ensure both you and your pet thrive together." },
];

const steps = [
    { num: "01", title: "Browse Animals", desc: "Explore our available pets and find the one that captures your heart." },
    { num: "02", title: "Submit Application", desc: "Fill out a simple adoption form with your details and preferences." },
    { num: "03", title: "Meet & Greet", desc: "Visit the shelter to meet your potential new family member in person." },
    { num: "04", title: "Take Home", desc: "Complete the paperwork and welcome your new companion home!" },
];

const testimonials = [
    { name: "Priya Sharma", text: "Adopting our dog Buddy through PawShelter was the best decision. The process was so smooth and the staff were incredibly caring.", avatar: "P" },
    { name: "Rahul Verma", text: "PawShelter made the entire adoption process seamless. Our cat Luna is now the heart of our family. Thank you!", avatar: "R" },
    { name: "Anita Desai", text: "The medical records and transparency gave us complete confidence. We love our new puppy Max!", avatar: "A" },
];

export default function LandingPage() {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Box sx={{ overflowX: "hidden" }}>
            {/* ── Navbar ── */}
            <Box
                sx={{
                    position: "fixed", top: 0, left: 0, right: 0, zIndex: 1100,
                    bgcolor: alpha(theme.palette.background.paper, 0.85),
                    backdropFilter: "blur(12px)",
                    borderBottom: `1px solid ${theme.palette.divider}`,
                }}
            >
                <Container maxWidth="lg">
                    <Box sx={{ display: "flex", alignItems: "center", py: 1.5 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <Box sx={{ width: 36, height: 36, borderRadius: 2.5, background: "linear-gradient(135deg, #4F46E5, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Pets sx={{ color: "white", fontSize: 20 }} />
                            </Box>
                            <Typography variant="h6" fontWeight={700} sx={{ background: "linear-gradient(135deg, #4F46E5, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                PawShelter
                            </Typography>
                        </Box>
                        <Box sx={{ flex: 1 }} />
                        <Box sx={{ display: "flex", gap: 1 }}>
                            <Button onClick={() => navigate("/login")} color="inherit" sx={{ fontWeight: 500 }}>Login</Button>
                            <Button onClick={() => navigate("/register")} variant="contained" size="small">Get Started</Button>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* ── Hero ── */}
            <Box
                sx={{
                    pt: 16, pb: 12,
                    background: "linear-gradient(135deg, #EEF2FF 0%, #F8FAFC 30%, #F0FDF4 100%)",
                    position: "relative", overflow: "hidden",
                }}
            >
                <Box sx={{ position: "absolute", top: 80, right: -60, width: 400, height: 400, borderRadius: "50%", bgcolor: alpha("#4F46E5", 0.04) }} />
                <Box sx={{ position: "absolute", bottom: -80, left: -80, width: 500, height: 500, borderRadius: "50%", bgcolor: alpha("#10B981", 0.04) }} />
                <Container maxWidth="lg" sx={{ position: "relative" }}>
                    <Grid container spacing={4} alignItems="center">
                        <Grid size={{ xs: 12, md: 7 }}>
                            <Box sx={{ mb: 3 }}>
                                <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, bgcolor: alpha("#4F46E5", 0.08), px: 2, py: 0.5, borderRadius: 8, mb: 3 }}>
                                    <Favorite sx={{ fontSize: 16, color: "primary.main" }} />
                                    <Typography variant="caption" fontWeight={600} color="primary.main">#AdoptDontShop</Typography>
                                </Box>
                            </Box>
                            <Typography variant="h2" fontWeight={800} sx={{ mb: 2, lineHeight: 1.15, fontSize: { xs: "2.5rem", md: "3.5rem" } }}>
                                Find Your{" "}
                                <Box component="span" sx={{ background: "linear-gradient(135deg, #4F46E5, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                    Forever Friend
                                </Box>
                            </Typography>
                            <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 520, fontWeight: 400, lineHeight: 1.6 }}>
                                Every paw deserves a loving home. Browse our shelter, meet amazing animals,
                                and start your journey to unconditional love today.
                            </Typography>
                            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    endIcon={<ArrowForward />}
                                    onClick={() => navigate("/animals")}
                                    sx={{ py: 1.5, px: 4, fontSize: 16 }}
                                >
                                    Browse Animals
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    onClick={() => navigate("/register")}
                                    sx={{ py: 1.5, px: 4, fontSize: 16, borderWidth: 2 }}
                                >
                                    Become an Adopter
                                </Button>
                            </Box>
                            {/* Mini Stats */}
                            <Box sx={{ display: "flex", gap: 5, mt: 6 }}>
                                {[
                                    { val: "500+", label: "Animals Rescued" },
                                    { val: "300+", label: "Happy Adopters" },
                                    { val: "50+", label: "Volunteers" },
                                ].map((s) => (
                                    <Box key={s.label}>
                                        <Typography variant="h4" fontWeight={800} color="primary.main">{s.val}</Typography>
                                        <Typography variant="body2" color="text.secondary" fontWeight={500}>{s.label}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, md: 5 }} sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
                            <Box
                                sx={{
                                    width: 380, height: 380, borderRadius: "50%",
                                    background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    boxShadow: "0 40px 80px rgba(79,70,229,0.25)",
                                }}
                            >
                                <Pets sx={{ fontSize: 160, color: "white", opacity: 0.85 }} />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* ── Features ── */}
            <Box sx={{ py: 10, bgcolor: "background.paper" }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: "center", mb: 6 }}>
                        <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>Why Choose PawShelter?</Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 560, mx: "auto" }}>
                            We're committed to making animal adoption a wonderful experience for both you and your future pet.
                        </Typography>
                    </Box>
                    <Grid container spacing={3}>
                        {features.map((f) => (
                            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={f.title}>
                                <Card
                                    sx={{
                                        height: "100%", textAlign: "center",
                                        transition: "transform 0.2s",
                                        "&:hover": { transform: "translateY(-6px)" },
                                    }}
                                >
                                    <CardContent sx={{ p: 4 }}>
                                        <Avatar
                                            sx={{
                                                width: 60, height: 60, mx: "auto", mb: 2.5,
                                                bgcolor: alpha("#4F46E5", 0.08), color: "#4F46E5",
                                            }}
                                        >
                                            {f.icon}
                                        </Avatar>
                                        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>{f.title}</Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>{f.desc}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* ── Adoption Steps ── */}
            <Box sx={{ py: 10, bgcolor: "background.default" }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: "center", mb: 6 }}>
                        <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>How Adoption Works</Typography>
                        <Typography variant="body1" color="text.secondary">Simple 4-step process to find your forever friend</Typography>
                    </Box>
                    <Grid container spacing={3}>
                        {steps.map((s, i) => (
                            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={s.num}>
                                <Box sx={{ textAlign: "center", position: "relative" }}>
                                    <Typography variant="h2" fontWeight={800} sx={{ color: alpha("#4F46E5", 0.08), mb: -2, fontSize: "4rem" }}>
                                        {s.num}
                                    </Typography>
                                    <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>{s.title}</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>{s.desc}</Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* ── Testimonials ── */}
            <Box sx={{ py: 10, bgcolor: "background.paper" }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: "center", mb: 6 }}>
                        <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>Happy Families</Typography>
                        <Typography variant="body1" color="text.secondary">Hear from our wonderful adopters</Typography>
                    </Box>
                    <Grid container spacing={3}>
                        {testimonials.map((t) => (
                            <Grid size={{ xs: 12, md: 4 }} key={t.name}>
                                <Card sx={{ height: "100%" }}>
                                    <CardContent sx={{ p: 4 }}>
                                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7, fontStyle: "italic" }}>
                                            "{t.text}"
                                        </Typography>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                            <Avatar sx={{ bgcolor: "primary.main", fontWeight: 600, width: 40, height: 40 }}>{t.avatar}</Avatar>
                                            <Typography variant="subtitle2" fontWeight={600}>{t.name}</Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* ── CTA ── */}
            <Box
                sx={{
                    py: 10,
                    background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
                    color: "white",
                    textAlign: "center",
                }}
            >
                <Container maxWidth="sm">
                    <Pets sx={{ fontSize: 48, mb: 2, opacity: 0.85 }} />
                    <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
                        Ready to Change a Life?
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.85, mb: 4, lineHeight: 1.6 }}>
                        Every animal deserves love. Start your adoption journey today and make a difference.
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate("/register")}
                        sx={{
                            py: 1.5, px: 5, fontSize: 16,
                            bgcolor: "white", color: "#4F46E5",
                            "&:hover": { bgcolor: "#F8FAFC", boxShadow: "0 8px 24px rgba(0,0,0,0.2)" },
                        }}
                    >
                        Get Started Now
                    </Button>
                </Container>
            </Box>

            {/* ── Footer ── */}
            <Box sx={{ py: 5, bgcolor: theme.palette.mode === "light" ? "#1E293B" : "#0F172A", color: "white" }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                                <Box sx={{ width: 32, height: 32, borderRadius: 2, background: "linear-gradient(135deg, #4F46E5, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Pets sx={{ color: "white", fontSize: 18 }} />
                                </Box>
                                <Typography variant="h6" fontWeight={700}>PawShelter</Typography>
                            </Box>
                            <Typography variant="body2" sx={{ opacity: 0.6, maxWidth: 280, lineHeight: 1.6 }}>
                                Making a difference in animal lives, one adoption at a time.
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 6, md: 2 }}>
                            <Typography variant="subtitle2" sx={{ mb: 1.5 }}>Quick Links</Typography>
                            <Typography variant="body2" sx={{ opacity: 0.6, mb: 0.8, cursor: "pointer" }} onClick={() => navigate("/animals")}>Browse Animals</Typography>
                            <Typography variant="body2" sx={{ opacity: 0.6, mb: 0.8, cursor: "pointer" }} onClick={() => navigate("/register")}>Register</Typography>
                            <Typography variant="body2" sx={{ opacity: 0.6, cursor: "pointer" }} onClick={() => navigate("/login")}>Login</Typography>
                        </Grid>
                        <Grid size={{ xs: 6, md: 2 }}>
                            <Typography variant="subtitle2" sx={{ mb: 1.5 }}>Resources</Typography>
                            <Typography variant="body2" sx={{ opacity: 0.6, mb: 0.8 }}>Adoption FAQs</Typography>
                            <Typography variant="body2" sx={{ opacity: 0.6, mb: 0.8 }}>Pet Care Guide</Typography>
                            <Typography variant="body2" sx={{ opacity: 0.6 }}>Contact Us</Typography>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Typography variant="subtitle2" sx={{ mb: 1.5 }}>Follow Us</Typography>
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <IconButton sx={{ color: "white", opacity: 0.6 }}><Facebook /></IconButton>
                                <IconButton sx={{ color: "white", opacity: 0.6 }}><Twitter /></IconButton>
                                <IconButton sx={{ color: "white", opacity: 0.6 }}><Instagram /></IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                    <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.1)" }} />
                    <Typography variant="body2" sx={{ opacity: 0.4, textAlign: "center" }}>
                        © 2026 PawShelter. Made with ❤️ by Sanket Kumar Kar
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
}
