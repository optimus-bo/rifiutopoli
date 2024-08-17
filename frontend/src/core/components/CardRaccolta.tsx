import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';
import { Raccolta } from '../../api/raccolte';
import { useRifiuti } from '../RifiutiContext';

type CardRaccoltaProps = {
  raccolta: Raccolta;
};

export default function CardRaccolta({ raccolta }: CardRaccoltaProps) {
  const { rimuoviRifiuto } = useRifiuti();

  return (
    <Paper sx={{ padding: 2, display: 'flex', border: 1, borderColor: 'primary.main' }}>
      <Stack>
        <Typography textAlign="left" variant="h6">
          {raccolta.rifiuto.nome}
        </Typography>
        <Typography textAlign="left" variant="h6">
          Codice CER: {raccolta.rifiuto.codice_cer}
        </Typography>
        <Typography variant="h6" textAlign="left">
          Totale: {raccolta.peso} Kg
        </Typography>
      </Stack>
      <Box flexGrow={1} />

      <Tooltip title="Rimuovi questo rifiuto">
        <IconButton color="error" onClick={() => rimuoviRifiuto(raccolta.rifiuto.codice_cer)}>
          <CloseIcon />
        </IconButton>
      </Tooltip>
    </Paper>
  );
}
