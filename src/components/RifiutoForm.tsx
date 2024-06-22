import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { Rifiuto } from '../api/rifiuti';

type RifiutoFormProps = {
  rifiuto: Rifiuto;
  butta: (nome: Rifiuto, peso: number) => void;
};
export default function RifiutoForm({ rifiuto, butta }: RifiutoFormProps) {
  const [value, setValue] = useState<number | null>(null);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const numberValue: number = parseFloat(event.target.value);
    if (!isNaN(numberValue)) {
      setValue(numberValue);
    } else {
      setValue(null);
    }
  }

  function eseguiRigstrazione() {
    butta(rifiuto, value ?? 0);
    setValue(null);
  }
  return (
    <Stack spacing={1}>
      <Typography variant="h5" fontWeight="bold" sx={{ textDecoration: 'underline' }} textAlign="left">
        {rifiuto.nome}
      </Typography>

      <TextField
        label="Kg da buttare"
        variant="outlined"
        value={value}
        onChange={onChange}
        InputProps={{
          startAdornment: (
            <IconButton onClick={() => setValue((value ?? 0) - 1)}>
              <RemoveCircleOutlineIcon />
            </IconButton>
          ),
          endAdornment: (
            <IconButton onClick={() => setValue((value ?? 0) + 1)}>
              <AddCircleOutlineIcon />
            </IconButton>
          ),
        }}
      />
      <Button variant="contained" onClick={eseguiRigstrazione} disabled={value === null}>
        Butta
      </Button>
    </Stack>
  );
}
