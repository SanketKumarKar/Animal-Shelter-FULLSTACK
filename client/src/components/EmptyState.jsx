import { Box, Typography, Button } from "@mui/material";
import InboxIcon from "@mui/icons-material/InboxOutlined";

export default function EmptyState({ title = "No data found", subtitle = "", action, actionLabel = "Add New" }) {
    return (
        <Box
            sx={{
                textAlign: "center",
                py: 8,
                px: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
            }}
        >
            <Box
                sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #EEF2FF, #E0E7FF)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 1,
                }}
            >
                <InboxIcon sx={{ fontSize: 40, color: "primary.main" }} />
            </Box>
            <Typography variant="h6" color="text.primary">{title}</Typography>
            {subtitle && <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 360 }}>{subtitle}</Typography>}
            {action && (
                <Button variant="contained" onClick={action} sx={{ mt: 1 }}>
                    {actionLabel}
                </Button>
            )}
        </Box>
    );
}
