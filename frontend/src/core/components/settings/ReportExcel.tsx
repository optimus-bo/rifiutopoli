import ArticleIcon from '@mui/icons-material/Article';
import DownloadIcon from '@mui/icons-material/Download';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { scaricaReportExcel } from '../../../api/documenti';
import PreconfiguredDialog from '../PreconfiguredDialog';

export default function ReportExcel() {
  const [open, setOpen] = useState(false);
  const [year, setYear] = useState<number>(2024);
  const [month, setMonth] = useState<number>(1);

  const { mutate: downloadExcel } = useMutation({
    mutationFn: async () => {
      const blob = await scaricaReportExcel(year, month);
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
          <Stack spacing={2} direction="row" marginTop={2}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Mese</InputLabel>
              <Select
                labelId="select-label"
                value={month}
                label="Mese"
                onChange={(event) => setMonth(Number(event.target.value))}
              >
                {[
                  'Gennaio',
                  'Febbraio',
                  'Marzo',
                  'Aprile',
                  'Maggio',
                  'Giugno',
                  'Luglio',
                  'Agosto',
                  'Settembre',
                  'Ottobre',
                  'Novembre',
                  'Dicembre',
                ].map((month, idx) => {
                  return (
                    // idx+1 perché l'endpoint è 1-indexed sul mese
                    <MenuItem key={idx} value={idx + 1}>
                      {month}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="select-label">Anno</InputLabel>
              <Select
                labelId="select-label"
                value={year}
                label="Anno"
                onChange={(event) => setYear(Number(event.target.value))}
              >
                {[2024, 2023].map((year) => {
                  return (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Stack>
        </Box>
      </PreconfiguredDialog>
    </>
  );
}
