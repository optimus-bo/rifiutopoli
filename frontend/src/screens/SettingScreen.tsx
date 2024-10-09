import { Stack } from '@mui/material';
import ListaRaccolte from '../core/components/ListaRaccolte';
import CreaOperatore from '../core/components/settings/CreaOperatore';
import CreaRifiuto from '../core/components/settings/CreaRifiuto';
import ReportExcel from '../core/components/settings/ReportExcel';

export default function SettingScreen() {
  return (
    <Stack direction="column" spacing={2} margin={3}>
      <CreaRifiuto />
      <CreaOperatore />
      <ReportExcel />
      <ListaRaccolte />
    </Stack>
  );
}
