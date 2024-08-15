import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { Button, Card, CardActionArea, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useToast } from 'optimus-bo-ui/dist/components/Toast';
import { Fragment } from 'react/jsx-runtime';
import { Raccolta, registraRaccolte } from '../api/raccolte';

type MenuRaccoltaProps = {
  raccolte: Raccolta[];
};

export default function MenuRaccolta({ raccolte }: MenuRaccoltaProps) {
  const { Component: ToastComponent, showToast } = useToast({});
  const { mutate } = useMutation({
    mutationFn: () => {
      return registraRaccolte(raccolte);
    },
    onSuccess: () => {
      showToast({ severity: 'success', text: 'Raccolta registrata correttamente' });
    },
    onError: () => {
      showToast({ severity: 'error', text: 'Qualcosa è andato storto nella raccolta' });
    },
  });

  return (
    <Card variant="outlined" sx={{ width: 350 }}>
      <CardHeader title="Rifiuti registrati" />
      <Divider />
      <CardContent>
        {raccolte.map((raccolta, idx) => {
          return (
            <Fragment key={idx}>
              <Typography textAlign="left">- {raccolta.rifiuto.nome}</Typography>
              <Typography variant="subtitle2" textAlign="left" ml={2}>
                {raccolta.peso} Kg
              </Typography>
            </Fragment>
          );
        })}
      </CardContent>

      <CardActionArea>
        <Button
          startIcon={<RestoreFromTrashIcon />}
          variant="contained"
          onClick={() => mutate()}
          disabled={raccolte.length === 0}
        >
          Conferma raccolta
        </Button>
      </CardActionArea>

      {ToastComponent}
    </Card>
  );
}
