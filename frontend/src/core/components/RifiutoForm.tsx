import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Slider, Stack } from '@mui/material';
import { useToast } from 'optimus-bo-ui/dist/components/Toast';
import { useState } from 'react';
import { Rifiuto } from '../../api/rifiuti';
import { useRifiuti } from '../RifiutiContext';
import NumberInput from './NumberInput';

type RifiutoFormProps = {
  rifiuto: Rifiuto;
};

export default function RifiutoForm({ rifiuto }: RifiutoFormProps) {
  const [value, setValue] = useState<number | null>(null);
  const { raccogliRifiuto } = useRifiuti();
  const { Component: ToastComponent, showToast } = useToast({});

  function eseguiRigstrazione() {
    // butta(rifiuto, value ?? 0);
    raccogliRifiuto(rifiuto, value ?? 0);
    setValue(null);
    showToast({ severity: 'success', text: 'Rifiuto aggiunto al cestino' });
  }

  return (
    <Stack spacing={2}>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <NumberInput label="Kg da buttare" value={value} onChange={(newvalue) => setValue(newvalue)} />
        <Slider
          value={value ?? 0}
          onChange={(_, value) => setValue(typeof value === 'number' ? value : value[0])}
          step={10}
          min={0}
          max={1000}
        />
      </Box>

      <Button
        variant="contained"
        onClick={eseguiRigstrazione}
        disabled={value === null}
        startIcon={<DeleteIcon />}
        sx={{ borderRadius: 3 }}
      >
        Butta
      </Button>

      {ToastComponent}
    </Stack>
  );
}
