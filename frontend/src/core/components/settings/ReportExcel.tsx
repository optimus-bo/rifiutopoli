import ArticleIcon from '@mui/icons-material/Article';
import DownloadIcon from '@mui/icons-material/Download';
import { Box, Button, Stack } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useMutation } from '@tanstack/react-query';
import { Dayjs } from 'dayjs';
import { useState } from 'react';
import { formElementsBorderRadius } from '../../values';
import PreconfiguredDialog from '../PreconfiguredDialog';

export default function ReportExcel() {
  const [open, setOpen] = useState(false);
  const [dataInizio, setDataInizio] = useState<Dayjs | undefined>(undefined);
  const [dataFine, setDataFine] = useState<Dayjs | undefined>(undefined);

  const { mutate: downloadExcel } = useMutation({
    mutationFn: async () => {
      // const blob = await scaricaReportExcel(dataInizio, dataFine);
      // //non ho idea di che faccia sta roba
      // const url = window.URL.createObjectURL(blob);
      // const link = document.createElement('a');
      // link.href = url;
      // link.setAttribute('download', 'report.xlsx');
      // document.body.appendChild(link);
      // link.click();
      // link.remove();
    },
  });

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="contained" fullWidth endIcon={<ArticleIcon />}>
        Report dello scarico
      </Button>

      <PreconfiguredDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Genera un report degli scarichi in formato Excel"
        onConfirm={() => {
          downloadExcel();
        }}
        confirmLabel="Download Excel"
        confirmIcon={<DownloadIcon />}
      >
        <Box sx={{ maxWidth: 1200 }}>
          <Stack spacing={2}>
            <DatePicker
              label="Inizio prenotazione"
              value={dataInizio}
              onChange={(data) => setDataInizio(data ?? undefined)}
              slotProps={{
                field: { clearable: true },
              }}
              sx={{
                '.MuiInputBase-root': {
                  borderRadius: formElementsBorderRadius,
                },
              }}
            />
            <DatePicker
              label="Fine prenotazione"
              value={dataFine}
              onChange={(data) => setDataFine(data ?? undefined)}
              minDate={dataInizio || undefined}
              slotProps={{
                field: { clearable: true },
              }}
              sx={{
                '.MuiInputBase-root': {
                  borderRadius: formElementsBorderRadius,
                },
              }}
            />
          </Stack>
        </Box>
      </PreconfiguredDialog>
    </>
  );
}
