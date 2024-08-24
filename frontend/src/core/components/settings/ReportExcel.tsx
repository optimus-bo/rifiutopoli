import ArticleIcon from '@mui/icons-material/Article';
import DownloadIcon from '@mui/icons-material/Download';
import { Box, Button } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { scaricaReportExcel } from '../../../api/documenti';
import SettingsDialog from './SettingsDialog';

export default function ReportExcel() {
  const [open, setOpen] = useState(false);

  // const { handleSubmit, register } = useForm<RifiutoCreate>({
  //   defaultValues: {
  //     descrizione: '',
  //   },
  // });

  const { mutate: downloadExcel } = useMutation({
    mutationFn: async () => {
      const blob = await scaricaReportExcel();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'gayport.xlsx');
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

      <SettingsDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Genera un report degli scarichi in formato Excel"
        onConfirm={() => {
          downloadExcel();
        }}
        confirmLabel="Download Excel"
        confirmIcon={<DownloadIcon />}
      >
        <Box sx={{ maxWidth: 1200 }}></Box>
      </SettingsDialog>
    </>
  );
}
