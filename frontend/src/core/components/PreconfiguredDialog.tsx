import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { PropsWithChildren, ReactNode } from 'react';

type PreconfiguredDialogProps = PropsWithChildren & {
  open: boolean;
  onClose: () => void;
  title?: string;
  hideConfirmButton?: boolean;
  confirmLabel?: string;
  confirmIcon?: ReactNode;
  onConfirm?: () => void;
  hideCloseButton?: boolean;
  closeLabel?: string;
};

export default function PreconfiguredDialog({
  open,
  onClose,
  children,
  title = '',
  hideCloseButton = false,
  hideConfirmButton = false,
  closeLabel = 'Chiudi',
  confirmLabel = 'Conferma',
  confirmIcon = undefined,
  onConfirm = () => {},
}: PreconfiguredDialogProps) {
  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <DialogTitle fontWeight="bold" variant="h4" textAlign="center">
        {title}
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>{children}</DialogContent>

      <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
        {!hideCloseButton && (
          <Button onClick={() => onClose()} variant="outlined" color="error" startIcon={<CloseIcon />}>
            {closeLabel}
          </Button>
        )}
        {!hideConfirmButton && (
          <Button onClick={() => onConfirm()} variant="contained" endIcon={confirmIcon}>
            {confirmLabel}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
