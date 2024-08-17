import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { Button, Card, CardActionArea, CardContent, CardHeader, Divider, Stack } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useToast } from 'optimus-bo-ui/dist/components/Toast';
import { registraRaccolte } from '../api/raccolte';
import { useRifiuti } from '../core/RifiutiContext';
import CardRaccolta from '../core/components/CardRaccolta';

export default function TrashScreen() {
  const { rifiutiRaccolti } = useRifiuti();
  const { Component: ToastComponent, showToast } = useToast({});

  const { mutate } = useMutation({
    mutationFn: () => {
      return registraRaccolte(rifiutiRaccolti);
    },
    onSuccess: () => {
      showToast({ severity: 'success', text: 'Raccolta registrata correttamente' });
    },
    onError: () => {
      showToast({ severity: 'error', text: 'Qualcosa è andato storto nella raccolta' });
    },
  });

  return (
    <Card variant="outlined" sx={{ width: '100%', maxWidth: 900 }}>
      <CardHeader title="Rifiuti registrati" />
      <Divider />
      <CardContent>
        <Stack direction="column" spacing={2}>
          {rifiutiRaccolti.map((raccolta, idx) => {
            return <CardRaccolta key={idx} raccolta={raccolta}></CardRaccolta>;
          })}
        </Stack>
      </CardContent>
      <Divider />

      <CardActionArea sx={{ padding: 1 }}>
        <Button
          startIcon={<RestoreFromTrashIcon />}
          variant="contained"
          onClick={() => mutate()}
          disabled={rifiutiRaccolti.length === 0}
        >
          Conferma raccolta
        </Button>
      </CardActionArea>

      {ToastComponent}
    </Card>
  );
}
