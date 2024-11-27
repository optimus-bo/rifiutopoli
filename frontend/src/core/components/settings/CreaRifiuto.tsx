import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { useState } from 'react';
import RifiutoAnagrafica from '../RifiutoAnagrafica';

export default function CreaRifiuto() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="contained"
        fullWidth
        startIcon={<AddCircleOutlineIcon />}
        endIcon={<DeleteIcon />}
      >
        Aggiungi rifiuto
      </Button>

      <RifiutoAnagrafica open={open} onClose={() => setOpen(false)} />
    </>
  );
}
