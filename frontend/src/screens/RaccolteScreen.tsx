import {
  Box,
  Checkbox,
  FormControlLabel,
  LinearProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Controller, useForm } from 'react-hook-form';
import { getRaccolte } from '../api/raccolte';

export default function RaccolteScreen() {
  const { control, watch } = useForm<{
    aggrega: boolean;
    escludiEsportati: boolean;
  }>({
    defaultValues: {
      aggrega: false,
      escludiEsportati: true,
    },
  });
  const watchFields = watch();

  const { data: raccolte = [], isFetching } = useQuery({
    queryKey: ['raccolte', watchFields.aggrega, watchFields.escludiEsportati],
    queryFn: () => {
      return getRaccolte({
        aggrega: watchFields.aggrega,
        esportato: watchFields.escludiEsportati ? false : undefined,
      });
    },
  });

  return (
    <Box>
      <Stack spacing={0}>
        <Controller
          name="aggrega"
          control={control}
          render={({ field }) => (
            <FormControlLabel control={<Checkbox {...field} checked={field.value} />} label="Aggrega" />
          )}
        />
        <Controller
          name="escludiEsportati"
          control={control}
          render={({ field }) => (
            <FormControlLabel control={<Checkbox {...field} checked={field.value} />} label="Escludi esportati" />
          )}
        />
      </Stack>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Esportato</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Codice</TableCell>
              <TableCell>HP</TableCell>
              <TableCell>Quantità</TableCell>
              <TableCell>Raggruppamento</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {isFetching ? (
              <LinearProgress />
            ) : (
              raccolte.map((raccolta) => (
                <TableRow key={raccolta.codice_eer} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" checked={raccolta.esportato} />
                  </TableCell>
                  <TableCell>{format(raccolta.data, 'dd/MM/yyyy HH:mm')}</TableCell>
                  <TableCell component="th" scope="row">
                    {raccolta.codice_eer}
                  </TableCell>
                  <TableCell>{raccolta.rifiuto.codice_eer}</TableCell>
                  <TableCell>
                    {raccolta.quantita} ({raccolta.rifiuto.um})
                  </TableCell>
                  <TableCell>{raccolta.rifiuto.codice_raggruppamento}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
