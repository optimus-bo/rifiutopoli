import { Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { getRaccolte } from '../api/raccolte';

export default function RaccolteScreen() {
  const { data: raccolte = [] } = useQuery({
    queryKey: ['raccolte'],
    queryFn: () => {
      return getRaccolte();
    },
  });

  return (
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
          {raccolte.map((raccolta) => (
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
