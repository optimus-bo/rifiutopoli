import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { PropsWithChildren } from 'react';

type SettingsDialogProps = PropsWithChildren & {
  open: boolean;
  onClose: () => void;
  title: string;
  onConfirm?: () => void;
  confirmLabel?: string;
};

export default function SettingsDialog({
  open,
  onClose,
  children,
  title,
  onConfirm = () => {},
  confirmLabel = 'Conferma',
}: SettingsDialogProps) {
  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <DialogTitle fontWeight="bold" variant="h4" textAlign="center">
        {title}
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>{children}</DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={() => onClose()} variant="outlined" color="error" startIcon={<CloseIcon />}>
          Chiudi
        </Button>
        <Button onClick={() => onConfirm()} variant="contained">
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}