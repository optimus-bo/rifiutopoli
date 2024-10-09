import { Box, Paper, Stack, Typography } from '@mui/material';
import { Raccolta } from '../../api/raccolte';

type CardRaccoltaProps = {
  raccolta: Raccolta;
};

export default function CardRaccolta({ raccolta }: CardRaccoltaProps) {
  return (
    <Paper sx={{ padding: 2, display: 'flex', border: 1, borderColor: 'primary.main' }}>
      <Stack>
        <Typography textAlign="left" variant="h6">
          {raccolta.rifiuto.nome}
        </Typography>
        <Typography textAlign="left" variant="h6">
          Codice CER: {raccolta.rifiuto.codice_eer}
        </Typography>
        <Typography variant="h6" textAlign="left">
          Totale: {raccolta.contenitori}
        </Typography>
      </Stack>
      <Box flexGrow={1} />
    </Paper>
  );
}
