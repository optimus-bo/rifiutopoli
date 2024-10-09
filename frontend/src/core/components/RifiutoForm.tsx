import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Slider, Stack } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useToast } from 'optimus-bo-ui/dist/components/Toast';
import { useState } from 'react';
import { BACKEND } from '../../api/backendClient';
import { getOperatori } from '../../api/operatori';
import { registraSingolaRaccolta } from '../../api/raccolte';
import { Rifiuto } from '../../api/rifiuti';
import NumberInput from './NumberInput';
import PreconfiguredDialog from './PreconfiguredDialog';

type RifiutoFormProps = {
  rifiuto: Rifiuto;
};
//questa è la cosa più stupida che abbia mai dovuto fare
const emptyIdValue = '';

export default function RifiutoForm({ rifiuto }: RifiutoFormProps) {
  const [numeroContenitori, setNumeroContenitori] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [idOperatore, setIdOperatore] = useState<number | typeof emptyIdValue>(emptyIdValue);
  const { Component: ToastComponent, showToast } = useToast({});

  const { data: operatori = [] } = useQuery({
    queryKey: [],
    queryFn: () => {
      return getOperatori();
    },
  });

  const { mutate: eseguiRegistrazione } = useMutation({
    mutationFn: async () => {
      if (idOperatore !== emptyIdValue) {
        return registraSingolaRaccolta({
          codice_eer: rifiuto.codice_eer,
          contenitori: numeroContenitori ?? 0,
          id_operatore: idOperatore,
        });
      }
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
          label="Numero Unità"
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
        disableConfirmButton={idOperatore === emptyIdValue}
      >
        <Stack spacing={2} padding={2} sx={{ width: '100%' }}>
          <Box component="img" src={`${BACKEND}/api/images/mappe/${rifiuto.codice_rdr}`} sx={{ width: '100%' }} />

          <FormControl fullWidth>
            <InputLabel id="select-label">Operatore</InputLabel>
            <Select
              labelId="select-label"
              value={idOperatore}
              label="Operatore"
              onChange={(event) => setIdOperatore(Number(event.target.value))}
            >
              {operatori.map((operatore) => {
                return (
                  <MenuItem key={operatore.nome} value={operatore.id}>
                    {operatore.nome}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Stack>
      </PreconfiguredDialog>
      {ToastComponent}
    </Stack>
  );
}
