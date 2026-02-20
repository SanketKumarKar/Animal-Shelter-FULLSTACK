import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
    Box, Drawer, AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem,
    List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Tooltip,
    InputBase, Badge, useTheme, Breadcrumbs, Link, Chip, alpha,
} from "@mui/material";
import {
    Menu as MenuIcon, ChevronLeft, Dashboard, Pets, People, PersonAdd,
    MedicalServices, VolunteerActivism, Handshake, Search, Notifications,
    DarkMode, LightMode, Logout, Settings, KeyboardArrowRight,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

const DRAWER_WIDTH = 280;
const DRAWER_COLLAPSED = 72;

const getNavItems = (role) => {
    const items = [
        { text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
        { text: "Animals", icon: <Pets />, path: "/dashboard/animals" },
        { text: "Adopters", icon: <People />, path: "/dashboard/adopters" },
    ];
    if (role === "admin" || role === "staff") {
        items.push(
            { text: "Staff", icon: <PersonAdd />, path: "/dashboard/staff" },
            { text: "Medical Records", icon: <MedicalServices />, path: "/dashboard/medical" },
        );
    }
    if (role === "admin") {
        items.push(
            { text: "Donations", icon: <VolunteerActivism />, path: "/dashboard/donations" },
            { text: "Volunteers", icon: <Handshake />, path: "/dashboard/volunteers" },
        );
    }
    return items;
};

export default function AppLayout({ toggleColorMode, mode }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const [drawerOpen, setDrawerOpen] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);

    const navItems = getNavItems(user?.role);

    const breadcrumbs = location.pathname
        .split("/")
        .filter(Boolean)
        .map((seg, i, arr) => ({
            label: seg.charAt(0).toUpperCase() + seg.slice(1),
            path: "/" + arr.slice(0, i + 1).join("/"),
        }));

    const handleLogout = () => {
        setAnchorEl(null);
        logout();
        navigate("/login");
    };

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
            {/* ── Sidebar ── */}
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerOpen ? DRAWER_WIDTH : DRAWER_COLLAPSED,
                    flexShrink: 0,
                    transition: "width 0.3s ease",
                    "& .MuiDrawer-paper": {
                        width: drawerOpen ? DRAWER_WIDTH : DRAWER_COLLAPSED,
                        transition: "width 0.3s ease",
                        overflowX: "hidden",
                        bgcolor: theme.palette.mode === "light" ? "#FFFFFF" : "#1E293B",
                        borderRight: `1px solid ${theme.palette.divider}`,
                    },
                }}
            >
                {/* Logo */}
                <Box sx={{ display: "flex", alignItems: "center", px: 2, py: 2.5, gap: 1.5 }}>
                    <Box
                        sx={{
                            width: 40, height: 40, borderRadius: 2,
                            background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            flexShrink: 0,
                        }}
                    >
                        <Pets sx={{ color: "white", fontSize: 22 }} />
                    </Box>
                    {drawerOpen && (
                        <Typography variant="h6" noWrap sx={{ fontWeight: 700, background: "linear-gradient(135deg, #4F46E5, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                            PawShelter
                        </Typography>
                    )}
                </Box>

                <Divider sx={{ mx: 2 }} />

                {/* Nav Items */}
                <List sx={{ px: 1.5, py: 1.5, flex: 1 }}>
                    {navItems.map((item) => {
                        const active = location.pathname === item.path;
                        return (
                            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                                <ListItemButton
                                    onClick={() => navigate(item.path)}
                                    sx={{
                                        borderRadius: 2,
                                        minHeight: 48,
                                        px: 2,
                                        bgcolor: active ? alpha(theme.palette.primary.main, 0.1) : "transparent",
                                        color: active ? "primary.main" : "text.secondary",
                                        "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.08) },
                                        justifyContent: drawerOpen ? "initial" : "center",
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 0, mr: drawerOpen ? 2 : 0, color: "inherit" }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    {drawerOpen && (
                                        <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: 14, fontWeight: active ? 600 : 400 }} />
                                    )}
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>

                {/* Collapse Toggle */}
                <Box sx={{ p: 1.5 }}>
                    <ListItemButton
                        onClick={() => setDrawerOpen(!drawerOpen)}
                        sx={{ borderRadius: 2, justifyContent: "center" }}
                    >
                        {drawerOpen ? <ChevronLeft /> : <MenuIcon />}
                    </ListItemButton>
                </Box>
            </Drawer>

            {/* ── Main Area ── */}
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {/* Top Bar */}
                <AppBar
                    position="sticky"
                    elevation={0}
                    sx={{
                        bgcolor: alpha(theme.palette.background.paper, 0.8),
                        backdropFilter: "blur(12px)",
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        color: "text.primary",
                    }}
                >
                    <Toolbar sx={{ gap: 2 }}>
                        {/* Search */}
                        <Box
                            sx={{
                                display: "flex", alignItems: "center", gap: 1,
                                bgcolor: alpha(theme.palette.primary.main, 0.05),
                                borderRadius: 2, px: 2, py: 0.5, flex: 1, maxWidth: 400,
                            }}
                        >
                            <Search sx={{ color: "text.secondary", fontSize: 20 }} />
                            <InputBase placeholder="Search…" sx={{ flex: 1, fontSize: 14 }} />
                        </Box>

                        <Box sx={{ flex: 1 }} />

                        {/* Dark Mode Toggle */}
                        <Tooltip title={mode === "light" ? "Dark Mode" : "Light Mode"}>
                            <IconButton onClick={toggleColorMode} sx={{ color: "text.secondary" }}>
                                {mode === "light" ? <DarkMode /> : <LightMode />}
                            </IconButton>
                        </Tooltip>

                        {/* Notifications */}
                        <Tooltip title="Notifications">
                            <IconButton sx={{ color: "text.secondary" }}>
                                <Badge badgeContent={3} color="error" variant="dot">
                                    <Notifications />
                                </Badge>
                            </IconButton>
                        </Tooltip>

                        {/* User Menu */}
                        <Tooltip title="Account">
                            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                                <Avatar
                                    sx={{
                                        width: 36, height: 36,
                                        background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
                                        fontSize: 14, fontWeight: 600,
                                    }}
                                >
                                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => setAnchorEl(null)}
                            PaperProps={{ sx: { borderRadius: 2, mt: 1, minWidth: 200 } }}
                        >
                            <Box sx={{ px: 2, py: 1.5 }}>
                                <Typography variant="subtitle2" fontWeight={600}>{user?.name}</Typography>
                                <Typography variant="caption" color="text.secondary">{user?.email}</Typography>
                            </Box>
                            <Divider />
                            <MenuItem onClick={handleLogout} sx={{ color: "error.main", gap: 1.5 }}>
                                <Logout fontSize="small" /> Logout
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>

                {/* Breadcrumbs */}
                <Box sx={{ px: 4, pt: 2 }}>
                    <Breadcrumbs separator={<KeyboardArrowRight sx={{ fontSize: 16 }} />} sx={{ fontSize: 13 }}>
                        {breadcrumbs.map((b, i) => (
                            <Link
                                key={b.path}
                                underline="hover"
                                color={i === breadcrumbs.length - 1 ? "text.primary" : "text.secondary"}
                                sx={{ cursor: "pointer", fontWeight: i === breadcrumbs.length - 1 ? 600 : 400, fontSize: 13 }}
                                onClick={() => navigate(b.path)}
                            >
                                {b.label}
                            </Link>
                        ))}
                    </Breadcrumbs>
                </Box>

                {/* Page Content */}
                <Box sx={{ flex: 1, p: 4, overflow: "auto" }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </Box>
            </Box>
        </Box>
    );
}
