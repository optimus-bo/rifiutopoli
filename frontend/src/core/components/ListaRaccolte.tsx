import { Paper, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { getRaccolte } from '../../api/raccolte';

export default function ListaRaccolte() {
  const { data: raccolte } = useQuery({
    queryKey: ['raccolte'],
    queryFn: () => {
      return getRaccolte();
    },
  });

  return (
    <Stack spacing={1}>
      <Typography variant="h5">Lista raccolte passate</Typography>
      {(raccolte || []).map((raccolta) => {
        return (
          <Paper
            key={raccolta.id}
            sx={{
              padding: 1,
              border: 1,
              borderColor: 'primary.main',
            }}
          >
            <Typography>
              <b>Rifiuto:</b> {raccolta.codice_eer}
            </Typography>
            <Typography>Unità: {raccolta.contenitori}</Typography>
            <Typography>Quando: {format(raccolta.data, 'dd/MM/yyyy HH:mm')}</Typography>
            <Typography>Id operazione: {raccolta.id}</Typography>
          </Paper>
        );
      })}
    </Stack>
  );
}
