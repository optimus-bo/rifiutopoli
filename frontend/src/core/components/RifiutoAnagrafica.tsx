import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Box, Button, Checkbox, Stack, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useToast } from 'optimus-bo-ui/dist/components/Toast';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { registraRifiuto, Rifiuto, RifiutoCreate } from '../../api/rifiuti';
import PreconfiguredDialog from './PreconfiguredDialog';

type RifiutoAnagraficaProps = {
  open: boolean;
  onClose: () => void;
  rifiuto?: Rifiuto;
};

export default function RifiutoAnagrafica({ open, onClose, rifiuto }: RifiutoAnagraficaProps) {
  const { Component, showToast } = useToast({ severity: 'error', text: 'Problema con il server' });
  const { handleSubmit, register } = useForm<RifiutoCreate>({ defaultValues: { sfuso: false } });
  const hasDefault = !!rifiuto;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file: File | undefined = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  }

  const { mutate } = useMutation({
    mutationFn: async (data: RifiutoCreate) => {
      if (selectedFile !== null) {
        return registraRifiuto(data, selectedFile);
      }
    },
    onSuccess: () => {
      onClose();
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
      <PreconfiguredDialog
        open={open}
        onClose={onClose}
        title="Registra un nuovo rifiuto"
        onConfirm={() => formSubmit()}
        confirmLabel="Registra"
      >
        <Box sx={{ maxWidth: 1200 }}>
          <Typography marginBottom={3}>Compila il modulo con le informazioni del tipo di riuto</Typography>

          <Stack direction="column" spacing={1}>
            <TextField
              label="Codice EER*"
              {...register('codice_eer', {
                required: 'Questo campo è obbligatorio',
              })}
            ></TextField>
            <TextField
              label="Tipo Contenitore*"
              {...register('contenitore', {
                required: 'Questo campo è obbligatorio',
              })}
            ></TextField>
            <TextField
              label="Codice RDR*"
              {...register('codice_rdr', {
                required: 'Questo campo è obbligatorio',
              })}
            ></TextField>
            {/* TODO: make a select */}
            <TextField
              label="Codice raggruppamento*"
              {...register('codice_raggruppamento', {
                required: 'Questo campo è obbligatorio',
              })}
            ></TextField>
            {/* TODO: make a checkbox */}
            <TextField label="Codice HP" {...register('codice_pittogramma')}></TextField>
            <TextField label="Unità di misura" {...register('um')}></TextField>
            <TextField label="Chili per contenitore" {...register('conversione')}></TextField>
            <Stack direction="row" alignItems="center">
              <Checkbox
                // label="Codice raggruppamento*"
                {...register('sfuso', {})}
              />
              <Typography>Sfuso</Typography>
            </Stack>

            <Button
              variant="contained"
              endIcon={<AddPhotoAlternateIcon />}
              onClick={() => {
                // triggera l'input file nascosto
                fileInputRef.current?.click();
              }}
              startIcon={selectedFile === null ? <CheckBoxOutlineBlankIcon /> : <CheckBoxIcon />}
            >
              Carica Foto
            </Button>
            {/* file input nascosto attivato dal bottone sopra */}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleFileChange}
            />
          </Stack>
        </Box>
      </PreconfiguredDialog>

      {Component}
    </>
  );
}
