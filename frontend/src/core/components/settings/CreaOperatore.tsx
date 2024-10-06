import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useToast } from 'optimus-bo-ui/dist/components/Toast';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { OperatoreCreate, registraOperatore } from '../../../api/operatori';
import PreconfiguredDialog from '../PreconfiguredDialog';

export default function CreaOperatore() {
  const [open, setOpen] = useState(false);

  const { Component, showToast } = useToast({ severity: 'error', text: 'Problema con il server' });
  const { handleSubmit, register } = useForm<OperatoreCreate>({});

  const { mutate } = useMutation({
    mutationFn: async (data: OperatoreCreate) => {
      return registraOperatore(data);
    },
    onSuccess: () => {
      setOpen(false);
    },
    onError: () => {
      showToast();
    },
  });

  function formSubmit() {
    handleSubmit((data) => mutate(data))();
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="contained"
        fullWidth
        startIcon={<AddCircleOutlineIcon />}
        endIcon={<DeleteIcon />}
      >
        Aggiungi operatore
      </Button>

      <PreconfiguredDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Registra un nuovo operatore"
        onConfirm={() => formSubmit()}
        confirmLabel="Registra"
      >
        <Box sx={{ maxWidth: 1200 }}>
          <Typography marginBottom={3}>Inserisci nome e cognome dell'operatore</Typography>

          <Stack direction="column" spacing={1}>
            <TextField
              label="Nome e Cognome"
              {...register('nome', {
                required: 'Questo campo è obbligatorio',
              })}
            ></TextField>
          </Stack>
        </Box>
      </PreconfiguredDialog>

      {Component}
    </>
  );
}
