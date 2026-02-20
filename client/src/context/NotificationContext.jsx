import { createContext, useContext, useState } from "react";
import { Snackbar, Alert, Slide } from "@mui/material";

const NotificationContext = createContext(null);

export const useNotification = () => useContext(NotificationContext);

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

export function NotificationProvider({ children }) {
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const [severity, setSeverity] = useState("success");

    const notify = (message, type = "success") => {
        setMsg(message);
        setSeverity(type);
        setOpen(true);
    };

    return (
        <NotificationContext.Provider value={{ notify }}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                TransitionComponent={SlideTransition}
            >
                <Alert
                    onClose={() => setOpen(false)}
                    severity={severity}
                    variant="filled"
                    sx={{ borderRadius: 3, fontWeight: 500, boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
                >
                    {msg}
                </Alert>
            </Snackbar>
        </NotificationContext.Provider>
    );
}
