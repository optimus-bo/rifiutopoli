import { Box, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getRifiuti } from '../api/rifiuti';
import ListaRifiuti from '../core/components/ListaRifiuti';

export default function MainScreen() {
  const { data: rifiuti, isFetching } = useQuery({
    queryKey: ['download-rifiuti'],
    queryFn: () => {
      return getRifiuti();
    },
  });

  return (
    <Box padding={2} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      {isFetching ? <CircularProgress size={70} /> : <ListaRifiuti rifiuti={rifiuti || []} />}
    </Box>
  );
}
