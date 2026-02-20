import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

export default function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
    return (
        <Dialog open={open} onClose={onCancel} PaperProps={{ sx: { borderRadius: 3, p: 1 } }}>
            <DialogTitle sx={{ fontWeight: 600 }}>{title || "Confirm Action"}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message || "Are you sure you want to proceed?"}</DialogContentText>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onCancel} color="inherit">Cancel</Button>
                <Button onClick={onConfirm} variant="contained" color="error">Confirm</Button>
            </DialogActions>
        </Dialog>
    );
}
