import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useToast } from 'optimus-bo-ui/dist/components/Toast';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { registraRifiuto, RifiutoCreate } from '../../../api/rifiuti';
import SettingsDialog from './SettingsDialog';

export default function CreaRifiuto() {
  const [open, setOpen] = useState(false);
  const { Component, showToast } = useToast({ severity: 'error', text: 'Problema con il server' });

  const { handleSubmit, register } = useForm<RifiutoCreate>({
    defaultValues: {
      descrizione: '',
    },
  });

  const { mutate } = useMutation({
    mutationFn: (data: RifiutoCreate) => {
      return registraRifiuto(data);
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
        Aggiungi rifiuto
      </Button>

      <SettingsDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Registra un nuovo rifiuto"
        onConfirm={() => formSubmit()}
        confirmLabel="Registra"
      >
        <Box sx={{ maxWidth: 1200 }}>
          <Typography marginBottom={3}>Compila il modulo con le informazioni del tipo di riuto</Typography>

          <Stack direction="column" spacing={1}>
            <TextField
              label="Codice CER*"
              {...register('codice_cer', {
                required: 'Questo campo è obbligatorio',
              })}
            ></TextField>
            <TextField
              label="Nome*"
              {...register('nome', {
                required: 'Questo campo è obbligatorio',
              })}
            ></TextField>
            <TextField label="Descrizione" {...register('descrizione')}></TextField>

            <Button variant="contained" endIcon={<AddPhotoAlternateIcon />}>
              Carica Foto
            </Button>
          </Stack>
        </Box>
      </SettingsDialog>

      {Component}
    </>
  );
}
