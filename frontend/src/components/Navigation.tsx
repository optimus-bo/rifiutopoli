import DeleteIcon from '@mui/icons-material/Delete';
import HandymanIcon from '@mui/icons-material/Handyman';
import HomeIcon from '@mui/icons-material/Home';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../routes';

const pagine = [routes.documenti, routes.rifiuti, routes.impostazioni];

export default function Navigation() {
  const [value, setValue] = useState(1);
  const navigate = useNavigate();

  function cambiaPagina(idx: number) {
    setValue(idx);
    navigate(pagine[idx]);
  }

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        //senza questo le label degli input field passano sopra
        zIndex: 2,
      }}
      elevation={4}
    >
      <BottomNavigation showLabels value={value} onChange={(event, newValue) => cambiaPagina(newValue)}>
        <BottomNavigationAction label="Cestino" icon={<DeleteIcon />} />
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Admin" icon={<HandymanIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
