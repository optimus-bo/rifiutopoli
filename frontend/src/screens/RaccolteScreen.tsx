import CancelIcon from '@mui/icons-material/Cancel';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Accordion,
  AccordionActions,
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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useMutation, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import { scaricaReportExcel } from '../api/documenti';
import { getRaccolte, getRaccolteAggregate, GetRaccolteParams, Raccolta, RaccolteAggregate } from '../api/raccolte';

function TableRaccolte({ raccolte, isFetching }: { raccolte: Raccolta[]; isFetching: boolean }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead sx={{ backgroundColor: 'primary.main', color: 'white' }}>
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
                  {raccolta.esportato ? <CheckBoxIcon color="success" /> : <CancelIcon color="error" />}
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
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead sx={{ backgroundColor: 'primary.main', color: 'white' }}>
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

function mapFormToQuery(watchFields: {
  aggrega: boolean;
  escludiEsportati: boolean;
  start_date: string;
  end_date: string;
}): GetRaccolteParams {
  return {
    esportato: watchFields.escludiEsportati ? false : undefined,
    start_date: watchFields.start_date,
    end_date: watchFields.end_date,
  };
}

export default function RaccolteScreen() {
  const { control, watch } = useForm<{
    aggrega: boolean;
    escludiEsportati: boolean;
    start_date: string;
    end_date: string;
  }>({
    defaultValues: {
      aggrega: false,
      escludiEsportati: true,
    },
  });
  const watchFields = watch();

  //TODO: clean
  const { data: raccolte = [], isFetching: fetchingRaccolte } = useQuery({
    queryKey: [
      'raccolte',
      watchFields.aggrega,
      watchFields.escludiEsportati,
      watchFields.start_date,
      watchFields.end_date,
    ],
    queryFn: () => {
      return getRaccolte(mapFormToQuery(watchFields));
    },
    enabled: !watchFields.aggrega,
  });
  const { data: raccolteAggregate = [], isFetching: fetchingAggregate } = useQuery({
    queryKey: [
      'raccolte',
      watchFields.aggrega,
      watchFields.escludiEsportati,
      watchFields.start_date,
      watchFields.end_date,
    ],
    queryFn: () => {
      return getRaccolteAggregate(mapFormToQuery(watchFields));
    },
    enabled: watchFields.aggrega,
  });

  const { mutate: downloadExcel } = useMutation({
    mutationFn: async () => {
      const blob = await scaricaReportExcel(mapFormToQuery(watchFields));
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
      <Accordion sx={{ marginBottom: 1, borderRadius: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ backgroundColor: 'primary.main', color: 'white', borderRadius: 2 }}
        >
          <FilterListIcon /> Filtri
        </AccordionSummary>
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
            <Stack direction="row" spacing={1} marginBottom={2}>
              <Controller
                name="start_date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Data inizio"
                    format="DD/MM/YYYY"
                    onChange={(date) => field.onChange(date?.toISOString() || '')}
                    value={field.value ? dayjs(field.value) : null}
                    slotProps={{
                      textField: {
                        size: 'small',
                        fullWidth: true,
                      },
                    }}
                  />
                )}
              />
              <Controller
                name="end_date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Data fine"
                    format="DD/MM/YYYY"
                    onChange={(date) => field.onChange(date?.toISOString() || '')}
                    value={field.value ? dayjs(field.value) : null}
                    slotProps={{
                      textField: {
                        size: 'small',
                        fullWidth: true,
                      },
                    }}
                  />
                )}
              />
            </Stack>

            <AccordionActions>
              <Button fullWidth variant="contained" onClick={() => downloadExcel()}>
                Genera report
              </Button>
            </AccordionActions>
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
