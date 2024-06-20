import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import { FancyImg } from 'optimus-bo-ui';
import { ChangeEvent, useState } from 'react';
import { Rifiuto } from '../api/rifiuti';

type RifiutoFancyProps = {
  rifiuto: Rifiuto;
  butta: (nome: Rifiuto, peso: number) => void;
};
export default function RifiutoFancy({ rifiuto, butta }: RifiutoFancyProps) {
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
    <Stack
      flexDirection="column"
      spacing={2}
      sx={{
        height: 500,
        width: 350,
      }}
    >
      <FancyImg src={rifiuto.imgSrc} />
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
