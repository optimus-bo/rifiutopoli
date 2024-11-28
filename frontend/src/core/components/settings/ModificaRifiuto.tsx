import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getRifiuti, Rifiuto } from '../../../api/rifiuti';
import PreconfiguredDialog from '../PreconfiguredDialog';
import RifiutoAnagrafica from '../RifiutoAnagrafica';

export default function ModificaRifiuto() {
  const [open, setOpen] = useState(false);
  const [openAnagrafica, setOpenAnagrafica] = useState(false);
  const [rifiutoSelezionato, setRifiutoSelezionato] = useState<Rifiuto | undefined>(undefined);

  const { data: rifiuti } = useQuery({
    queryKey: [],
    queryFn: () => {
      return getRifiuti();
    },
  });

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="contained"
        fullWidth
        startIcon={<EditIcon />}
        endIcon={<DeleteIcon />}
      >
        Modifica rifiuti
      </Button>

      <RifiutoAnagrafica open={openAnagrafica} onClose={() => setOpenAnagrafica(false)} rifiuto={rifiutoSelezionato} />

      <PreconfiguredDialog open={open} onClose={() => setOpen(false)} title="Seleziona un rifiuto">
        <List sx={{ maxWidth: 1200 }}>
          {rifiuti?.map((rifiuto) => {
            const pericoloso = !rifiuto.codice_pittogramma;

            return (
              <ListItem key={rifiuto.codice_eer} disablePadding>
                <ListItemButton
                  onClick={() => {
                    setRifiutoSelezionato(rifiuto);
                    setOpenAnagrafica(true);
                    setOpen(false);
                  }}
                >
                  <ListItemText primary={rifiuto.codice_eer} color={pericoloso ? 'red' : 'green'} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </PreconfiguredDialog>
    </>
  );
}
