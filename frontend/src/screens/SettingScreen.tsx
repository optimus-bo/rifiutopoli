import { Stack } from '@mui/material';
import CreaRifiuto from '../core/components/settings/CreaRifiuto';
import ReportExcel from '../core/components/settings/ReportExcel';

export default function SettingScreen() {
  return (
    <Stack direction="column" spacing={2} margin={3}>
      <CreaRifiuto />
      <ReportExcel />
    </Stack>
  );
}
