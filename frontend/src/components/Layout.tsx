import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SettingsIcon from '@mui/icons-material/Settings';
import { BottomNavigation, BottomNavigationAction, Box, Paper } from '@mui/material';
import { PropsWithChildren, useState } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  const [value, setValue] = useState(0);

  return (
    <>
      <Box
        sx={{
          padding: 1,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {children}
      </Box>
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Documenti" icon={<PictureAsPdfIcon />} />
          <BottomNavigationAction label="Rifiuti" icon={<DeleteIcon />} />
          <BottomNavigationAction label="Impostazioni" icon={<SettingsIcon />} />
        </BottomNavigation>
      </Paper>
    </>
  );
}
