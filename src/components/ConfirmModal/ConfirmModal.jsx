import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import "./style.css"

// eslint-disable-next-line react/prop-types
const ConfirmModal = ({ open, onClose, onConfirm, title }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title || "Tem certeza que deseja continuar?"}</DialogTitle>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="primary">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
