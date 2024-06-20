import { Box, Stack } from '@mui/material';
import { FancyImg } from 'optimus-bo-ui';
import { Rifiuto } from '../api/rifiuti';
import RifiutoForm from './RifiutoForm';

type RifiutoFancyProps = {
  rifiuto: Rifiuto;
  butta: (nome: Rifiuto, peso: number) => void;
};
export default function RifiutoFancy({ rifiuto, butta }: RifiutoFancyProps) {
  return (
    <Stack
      flexDirection="column"
      justifyContent="flex-end"
      sx={{
        border: 2,
        borderColor: 'primary.main',
        borderRadius: 2,
        height: 500,
        width: 350,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <FancyImg src={rifiuto.imgSrc} />
      </Box>

      <Box sx={{ height: 2, backgroundColor: 'primary.main' }} />
      <Box padding={2}>
        <RifiutoForm rifiuto={rifiuto} butta={butta} />
      </Box>
    </Stack>
  );
}
