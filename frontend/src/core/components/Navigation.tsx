import DeleteIcon from '@mui/icons-material/Delete';
import HandymanIcon from '@mui/icons-material/Handyman';
import HomeIcon from '@mui/icons-material/Home';
import { Badge, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRifiuti } from '../RifiutiContext';
import { routes } from '../routes';

const pagine = [routes.cestino, routes.rifiuti, routes.impostazioni];

export default function Navigation() {
  // parte dall'indice 1 che è la pagina centrale, la home page
  const [screen, setScreen] = useState(1);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { rifiutiRaccolti } = useRifiuti();

  function cambiaPagina(newScreen: number) {
    setScreen(newScreen);
    navigate(pagine[newScreen]);
  }

  useEffect(() => {
    const index = pagine.findIndex((route) => route === pathname);
    if (index !== -1) {
      setScreen(index);
    }
  }, []);

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
        backgroundColor: 'primary.main',
      }}
      elevation={4}
    >
      <BottomNavigation
        showLabels
        value={screen}
        onChange={(event, newValue) => cambiaPagina(newValue)}
        sx={{
          backgroundColor: 'primary.main',
        }}
      >
        <BottomNavigationAction
          label="Cestino"
          icon={
            <Badge badgeContent={rifiutiRaccolti.length} color="info">
              <DeleteIcon />
            </Badge>
          }
          sx={{
            '&.Mui-selected': {
              color: 'white',
            },
          }}
        />
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          sx={{
            '&.Mui-selected': {
              color: 'white',
            },
          }}
        />
        <BottomNavigationAction
          label="Admin"
          icon={<HandymanIcon />}
          sx={{
            '&.Mui-selected': {
              color: 'white',
            },
          }}
        />
      </BottomNavigation>
    </Paper>
  );
}
