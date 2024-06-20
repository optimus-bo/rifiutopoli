import { Stack } from '@mui/material';
import { Rifiuto } from '../api/rifiuti';
import RifiutoFancy from './RifiutoFancy';

type ListaRifiuti = {
  rifiuti: Rifiuto[];
  onSubmit: (rifiuto: Rifiuto, qt: number) => void;
};

export default function ListaRifiuti({ rifiuti, onSubmit }: ListaRifiuti) {
  return (
    <Stack direction="row" spacing={4} flexWrap="wrap" justifyContent="center">
      {rifiuti.map((rifiuto, idx) => {
        return <RifiutoFancy rifiuto={rifiuto} key={idx} butta={(rifiuto, peso) => onSubmit(rifiuto, peso)} />;
      })}
    </Stack>
  );
}
