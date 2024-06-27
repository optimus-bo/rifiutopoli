import { Button, Stack, Typography } from '@mui/material';
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
    <Stack spacing={1}>
      <Typography variant="h5" fontWeight="bold" sx={{ textDecoration: 'underline' }} textAlign="left">
        {rifiuto.nome}
      </Typography>

      <NumberInput label="Kg da buttare" value={value} onChange={(newvalue) => setValue(newvalue)} />
      <Button variant="contained" onClick={eseguiRigstrazione} disabled={value === null}>
        Butta
      </Button>
    </Stack>
  );
}
