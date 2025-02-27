import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import "./style.css";

// eslint-disable-next-line react/prop-types
const ConfirmModal = ({ open, onClose, onConfirm, title }) => {
  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ className: "dialog-paper" }}>
      <DialogTitle className="dialog-title">{title || "Tem certeza que deseja continuar?"}</DialogTitle>
      <DialogActions className="dialog-actions">
        <Button
          onClick={onClose}
          className="dialog-button dialog-button-cancel"
        >
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          className="dialog-button dialog-button-confirm"
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
