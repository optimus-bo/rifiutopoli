import { Grid } from '@mui/material';
import { Rifiuto } from '../api/rifiuti';
import RifiutoFancy from './RifiutoFancy';

type ListaRifiuti = {
  rifiuti: Rifiuto[];
  onSubmit: (rifiuto: Rifiuto, qt: number) => void;
};

export default function ListaRifiuti({ rifiuti, onSubmit }: ListaRifiuti) {
  return (
    <Grid container spacing={2} justifyContent="center">
      {rifiuti.map((rifiuto, idx) => {
        return (
          <Grid item key={idx} md={3}>
            <RifiutoFancy rifiuto={rifiuto} key={idx} butta={(rifiuto, peso) => onSubmit(rifiuto, peso)} />
          </Grid>
        );
      })}
    </Grid>
  );
}
