import { createTheme, alpha } from "@mui/material/styles";

const getDesignTokens = (mode) => ({
    palette: {
        mode,
        primary: { main: "#4F46E5", light: "#818CF8", dark: "#3730A3" },
        secondary: { main: "#10B981", light: "#34D399", dark: "#059669" },
        warning: { main: "#F59E0B", light: "#FBBF24", dark: "#D97706" },
        error: { main: "#EF4444", light: "#F87171", dark: "#DC2626" },
        info: { main: "#3B82F6", light: "#60A5FA", dark: "#2563EB" },
        background: {
            default: mode === "light" ? "#F8FAFC" : "#0F172A",
            paper: mode === "light" ? "#FFFFFF" : "#1E293B",
        },
        text: {
            primary: mode === "light" ? "#1E293B" : "#F1F5F9",
            secondary: mode === "light" ? "#64748B" : "#94A3B8",
        },
        divider: mode === "light" ? "#E2E8F0" : "#334155",
    },
    shape: { borderRadius: 8 },
    typography: {
        fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
        h4: { fontWeight: 700 },
        h5: { fontWeight: 700 },
        h6: { fontWeight: 600 },
        subtitle1: { fontWeight: 500 },
        button: { textTransform: "none", fontWeight: 600 },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');`,
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow:
                        mode === "light"
                            ? "0 1px 3px rgba(0,0,0,0.04), 0 6px 16px rgba(0,0,0,0.04)"
                            : "0 1px 3px rgba(0,0,0,0.2), 0 6px 16px rgba(0,0,0,0.2)",
                    borderRadius: 8,
                    border: `1px solid ${mode === "light" ? "#E2E8F0" : "#334155"}`,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: "10px 24px",
                    fontWeight: 600,
                    boxShadow: "none",
                    "&:hover": { boxShadow: "0 4px 12px rgba(79,70,229,0.3)" },
                },
                containedPrimary: {
                    background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: { "& .MuiOutlinedInput-root": { borderRadius: 8 } },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: { borderRadius: 8 },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    fontWeight: 600,
                    backgroundColor: mode === "light" ? "#F8FAFC" : "#1E293B",
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: { fontWeight: 500, borderRadius: 6 },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    border: "none",
                    boxShadow:
                        mode === "light"
                            ? "4px 0 24px rgba(0,0,0,0.04)"
                            : "4px 0 24px rgba(0,0,0,0.3)",
                },
            },
        },
        MuiFab: {
            styleOverrides: {
                root: {
                    boxShadow: "0 8px 24px rgba(79,70,229,0.3)",
                },
            },
        },
    },
});

export const createAppTheme = (mode) => createTheme(getDesignTokens(mode));
