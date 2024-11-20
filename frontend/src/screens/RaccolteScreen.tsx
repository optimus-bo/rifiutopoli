import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
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
import { useMutation, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Controller, useForm } from 'react-hook-form';
import { scaricaReportExcel } from '../api/documenti';
import { getRaccolte, getRaccolteAggregate, Raccolta, RaccolteAggregate } from '../api/raccolte';

function TableRaccolte({ raccolte, isFetching }: { raccolte: Raccolta[]; isFetching: boolean }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead sx={{ backgroundColor: 'primary.main' }}>
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
                <TableCell>{raccolta.rifiuto.codice_pittogramma}</TableCell>
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
  );
}

function TableRaccolteAggregate({ raccolte, isFetching }: { raccolte: RaccolteAggregate[]; isFetching: boolean }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead sx={{ backgroundColor: 'primary.main' }}>
          <TableRow>
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
                <TableCell component="th" scope="row">
                  {raccolta.codice_eer}
                </TableCell>
                <TableCell>{raccolta.codice_pittogramma}</TableCell>
                <TableCell>
                  {raccolta.quantita} ({raccolta.um})
                </TableCell>
                <TableCell>{raccolta.codice_raggruppamento}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

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

  //TODO: clean
  const { data: raccolte = [], isFetching: fetchingRaccolte } = useQuery({
    queryKey: ['raccolte', watchFields.aggrega, watchFields.escludiEsportati],
    queryFn: () => {
      return getRaccolte({
        esportato: watchFields.escludiEsportati ? false : undefined,
      });
    },
    enabled: !watchFields.aggrega,
  });
  const { data: raccolteAggregate = [], isFetching: fetchingAggregate } = useQuery({
    queryKey: ['raccolte-aggregate', watchFields.aggrega, watchFields.escludiEsportati],
    queryFn: () => {
      return getRaccolteAggregate({
        esportato: watchFields.escludiEsportati ? false : undefined,
      });
    },
    enabled: watchFields.aggrega,
  });

  const { mutate: downloadExcel } = useMutation({
    mutationFn: async () => {
      const blob = await scaricaReportExcel();
      //non ho idea di che faccia sta roba
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'report.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    },
  });

  return (
    <Box>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>Filtri</AccordionSummary>
        <AccordionDetails>
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

            <Button fullWidth variant="contained" onClick={() => downloadExcel()}>
              Genera report
            </Button>
          </Stack>
        </AccordionDetails>
      </Accordion>

      {watchFields.aggrega ? (
        <TableRaccolteAggregate raccolte={raccolteAggregate} isFetching={fetchingAggregate} />
      ) : (
        <TableRaccolte raccolte={raccolte} isFetching={fetchingRaccolte} />
      )}
    </Box>
  );
}
