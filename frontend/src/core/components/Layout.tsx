import { Box } from '@mui/material';
import { PropsWithChildren } from 'react';
import Navigation from './Navigation';

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
