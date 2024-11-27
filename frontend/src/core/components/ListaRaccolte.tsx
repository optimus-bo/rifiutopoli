import ArticleIcon from '@mui/icons-material/Article';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useMutation, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import dayjs from 'dayjs';
import { useToast } from 'optimus-bo-ui/dist/components/Toast';
import { Controller, useForm } from 'react-hook-form';
import { scaricaReportExcel } from '../../api/documenti';
import {
  deleteRaccolta,
  getRaccolte,
  getRaccolteAggregate,
  GetRaccolteParams,
  Raccolta,
  RaccolteAggregate,
} from '../../api/raccolte';
import PreconfiguredAccordion from './PreconfiguredAccordion';

function TableRaccolte({
  raccolte,
  isFetching,
  refetch,
}: {
  raccolte: Raccolta[];
  isFetching: boolean;
  refetch: () => void;
}) {
  const { Component, showToast } = useToast({});

  const { mutate } = useMutation({
    mutationFn: async (vars: { idRaccolta: number; dataRaccolta: string }) => {
      return deleteRaccolta(vars.idRaccolta, vars.dataRaccolta);
    },
    onSuccess: () => {
      showToast({
        text: 'Carico eliminato',
        severity: 'success',
      });
      refetch();
    },
    onError: () => {
      showToast({
        text: 'Qualcosa è andato storto',
        severity: 'error',
      });
    },
  });

  return (
    <>
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
              <TableCell></TableCell>
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
                  <Tooltip title="Cancella">
                    <TableCell>
                      <IconButton onClick={() => mutate({ idRaccolta: raccolta.id, dataRaccolta: raccolta.data })}>
                        <DeleteForeverIcon />
                      </IconButton>
                    </TableCell>
                  </Tooltip>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {Component}
    </>
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

export default function ListaRaccolte() {
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
  const {
    data: raccolte = [],
    isFetching: fetchingRaccolte,
    refetch,
  } = useQuery({
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
      <PreconfiguredAccordion
        summary={
          <>
            <FilterListIcon /> Filtri
          </>
        }
        actions={
          <Button fullWidth variant="contained" onClick={() => downloadExcel()} endIcon={<ArticleIcon />}>
            Genera report
          </Button>
        }
        details={
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
          </Stack>
        }
      />

      {watchFields.aggrega ? (
        <TableRaccolteAggregate raccolte={raccolteAggregate} isFetching={fetchingAggregate} />
      ) : (
        <TableRaccolte raccolte={raccolte} isFetching={fetchingRaccolte} refetch={refetch} />
      )}
    </Box>
  );
}
