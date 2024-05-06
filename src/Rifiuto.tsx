import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import { FancyImg } from 'optimus-bo-ui';
import { ChangeEvent, useState } from 'react';

interface RifiutoProps {
  rifiuto: { img: string; nome: string };
  butta: (nome: string, peso: number) => void;
}
export default function Rifiuto({ rifiuto, butta }: RifiutoProps) {
  const [value, setValue] = useState<number | null>(null);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const numberValue: number = parseFloat(event.target.value);
    if (!isNaN(numberValue)) {
      setValue(numberValue);
    } else {
      setValue(null);
    }
  }

  return (
    <Stack flexDirection="column">
      <FancyImg src={rifiuto.img} />
      <Typography variant="h5" fontWeight="bold">
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
      <Button variant="contained" onClick={() => butta(rifiuto.nome, value ?? 0)} disabled={value !== null}>
        Butta
      </Button>
    </Stack>
  );
}
