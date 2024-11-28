import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Box, Button, Checkbox, FormControlLabel, Stack, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useToast } from 'optimus-bo-ui/dist/components/Toast';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { registraRifiuto, Rifiuto, RifiutoCreate, updateRifiuto } from '../../api/rifiuti';
import PreconfiguredDialog from './PreconfiguredDialog';

type RifiutoAnagraficaProps = {
  open: boolean;
  onClose: () => void;
  rifiuto?: Rifiuto;
};

export default function RifiutoAnagrafica({ open, onClose, rifiuto }: RifiutoAnagraficaProps) {
  const hasDefault = !!rifiuto;
  const { Component, showToast } = useToast({ severity: 'error', text: 'Problema con il server' });
  const { handleSubmit, register, reset, control } = useForm<RifiutoCreate>({
    defaultValues: {
      sfuso: true,
    },
  });

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
      if (hasDefault) {
        return updateRifiuto(data);
      } else if (!hasDefault && selectedFile !== null) {
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

  useEffect(() => {
    if (rifiuto) {
      reset({
        sfuso: rifiuto.sfuso,
        codice_eer: rifiuto.codice_eer,
        codice_pittogramma: rifiuto.codice_pittogramma,
        codice_raggruppamento: rifiuto.codice_raggruppamento,
        codice_rdr: rifiuto.codice_rdr,
        contenitore: rifiuto.contenitore,
        conversione: rifiuto.conversione,
        img_src: rifiuto.img_src,
        um: rifiuto.um,
      });
    }
  }, [rifiuto, reset]);

  return (
    <>
      <PreconfiguredDialog
        open={open}
        onClose={onClose}
        title={hasDefault ? `Aggiorna ${rifiuto.codice_eer}` : 'Registra un nuovo rifiuto'}
        onConfirm={() => formSubmit()}
        confirmLabel="Registra"
      >
        <Box sx={{ maxWidth: 1200 }}>
          <Typography marginBottom={3}>Compila il modulo con le informazioni del riuto</Typography>

          <Stack direction="column" spacing={1}>
            {!hasDefault && (
              <TextField
                label="Codice EER*"
                {...register('codice_eer', {
                  required: 'Questo campo è obbligatorio',
                })}
              ></TextField>
            )}
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
            <TextField label="Codice HP" {...register('codice_pittogramma')}></TextField>
            <TextField label="Unità di misura" {...register('um')}></TextField>
            <TextField label="Chili per contenitore" {...register('conversione')}></TextField>
            <Controller
              name="sfuso"
              control={control}
              render={({ field }) => (
                <FormControlLabel control={<Checkbox {...field} checked={field.value} />} label="Sfuso" />
              )}
            />

            {!hasDefault && (
              <>
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
                /* file input nascosto attivato dal bottone sopra */
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </>
            )}
          </Stack>
        </Box>
      </PreconfiguredDialog>

      {Component}
    </>
  );
}
