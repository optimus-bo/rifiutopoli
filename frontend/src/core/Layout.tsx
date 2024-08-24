import { Box } from '@mui/material';
import { PropsWithChildren } from 'react';
import Navigation from './components/Navigation';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Box
      sx={{
        padding: 1,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {children}
      <Navigation />
    </Box>
  );
}
