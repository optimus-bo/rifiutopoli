import { Grid } from '@mui/material';
import { Rifiuto } from '../../api/rifiuti';
import RifiutoFancy from './RifiutoFancy';

type ListaRifiuti = {
  rifiuti: Rifiuto[];
};

export default function ListaRifiuti({ rifiuti }: ListaRifiuti) {
  return (
    <Grid container sx={{ width: '100%' }}>
      {rifiuti.map((rifiuto, idx) => {
        return (
          <Grid key={idx} item padding={2}>
            <RifiutoFancy rifiuto={rifiuto} key={idx} />
          </Grid>
        );
      })}
    </Grid>
  );
}
