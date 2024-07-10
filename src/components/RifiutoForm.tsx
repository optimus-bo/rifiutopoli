import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Slider, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { Rifiuto } from '../api/rifiuti';
import NumberInput from './NumberInput';

type RifiutoFormProps = {
  rifiuto: Rifiuto;
  butta: (nome: Rifiuto, peso: number) => void;
};
export default function RifiutoForm({ rifiuto, butta }: RifiutoFormProps) {
  const [value, setValue] = useState<number | null>(null);

  function eseguiRigstrazione() {
    butta(rifiuto, value ?? 0);
    setValue(null);
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h5" fontWeight="bold" sx={{ textDecoration: 'underline' }} textAlign="left">
        {rifiuto.nome}
      </Typography>

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
    </Stack>
  );
}
