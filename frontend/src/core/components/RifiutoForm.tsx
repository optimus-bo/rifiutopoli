import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Slider, Stack } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useToast } from 'optimus-bo-ui/dist/components/Toast';
import { useState } from 'react';
import { BACKEND } from '../../api/backendClient';
import { registraSingolaRaccolta } from '../../api/raccolte';
import { Rifiuto } from '../../api/rifiuti';
import NumberInput from './NumberInput';
import PreconfiguredDialog from './PreconfiguredDialog';

type RifiutoFormProps = {
  rifiuto: Rifiuto;
};

export default function RifiutoForm({ rifiuto }: RifiutoFormProps) {
  const [numeroContenitori, setNumeroContenitori] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const { Component: ToastComponent, showToast } = useToast({});

  const { mutate: eseguiRegistrazione } = useMutation({
    mutationFn: async () => {
      return registraSingolaRaccolta({
        codice_eer: rifiuto.codice_eer,
        quantita: numeroContenitori ?? 0,
      });
    },
    onSuccess: () => {
      setNumeroContenitori(null);
      showToast({ severity: 'success', text: 'Carico registrato correttamente' });
      setOpen(false);
    },
    onError: () => {
      showToast({ severity: 'error', text: 'Qualcosa è andato storto nella raccolta' });
    },
  });

  return (
    <Stack spacing={2} marginTop={2}>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <NumberInput
          label={`Numero Unità (${rifiuto.um})`}
          value={numeroContenitori}
          onChange={(newvalue) => setNumeroContenitori(newvalue)}
        />
        <Slider
          value={numeroContenitori ?? 0}
          onChange={(_, value) => setNumeroContenitori(typeof value === 'number' ? value : value[0])}
          step={1}
          min={0}
          max={10}
        />
      </Box>

      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        disabled={numeroContenitori === null}
        startIcon={<DeleteIcon />}
        sx={{ borderRadius: 3 }}
      >
        Carico
      </Button>

      <PreconfiguredDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Locazione RDR"
        hideCloseButton
        confirmLabel="Conferma Carico"
        onConfirm={eseguiRegistrazione}
      >
        <Stack spacing={2} padding={2} sx={{ width: '100%' }}>
          <Box component="img" src={`${BACKEND}/api/images/mappe/${rifiuto.codice_rdr}`} sx={{ width: '100%' }} />
        </Stack>
      </PreconfiguredDialog>
      {ToastComponent}
    </Stack>
  );
}
