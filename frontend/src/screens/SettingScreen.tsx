import SettingsIcon from '@mui/icons-material/Settings';
import { Stack } from '@mui/material';
import ListaRaccolte from '../core/components/ListaRaccolte';
import PreconfiguredAccordion from '../core/components/PreconfiguredAccordion';
import CreaRifiuto from '../core/components/settings/CreaRifiuto';
import ModificaRifiuto from '../core/components/settings/ModificaRifiuto';

export default function SettingScreen() {
  return (
    <Stack direction="column" spacing={5} margin={3}>
      <PreconfiguredAccordion
        summary={
          <>
            <SettingsIcon /> Impostazioni
          </>
        }
        actions={
          <Stack spacing={1} sx={{ width: '100%' }}>
            <CreaRifiuto />
            <ModificaRifiuto />
          </Stack>
        }
      />

      <ListaRaccolte />
    </Stack>
  );
}
