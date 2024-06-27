import { Grid } from '@mui/material';
import { Rifiuto } from '../api/rifiuti';
import RifiutoFancy from './RifiutoFancy';

type ListaRifiuti = {
  rifiuti: Rifiuto[];
  onSubmit: (rifiuto: Rifiuto, qt: number) => void;
};

export default function ListaRifiuti({ rifiuti, onSubmit }: ListaRifiuti) {
  return (
    // <Stack direction="row" spacing={4} flexWrap="wrap" justifyContent="center">
    <Grid container sx={{ width: '100%' }}>
      {rifiuti.map((rifiuto, idx) => {
        return (
          <Grid key={idx} item padding={2}>
            <RifiutoFancy rifiuto={rifiuto} key={idx} butta={(rifiuto, peso) => onSubmit(rifiuto, peso)} />
          </Grid>
        );
      })}
      {/* </Stack> */}
    </Grid>
  );
}
