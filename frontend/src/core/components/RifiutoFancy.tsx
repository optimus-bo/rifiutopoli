import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { BACKEND } from '../../api/backendClient';
import { Rifiuto } from '../../api/rifiuti';
import RifiutoForm from './RifiutoForm';

const imgHeight = 300;
export const defaultCardElevation = 8;

type RifiutoFancyProps = {
  rifiuto: Rifiuto;
};

export default function RifiutoFancy({ rifiuto }: RifiutoFancyProps) {
  // rifiuto pericolosio se il codice pittogramma non è un falsy
  const pericoloso = !!rifiuto.codice_pittogramma;
  const colore = pericoloso ? 'red' : 'green';

  return (
    <Card
      elevation={defaultCardElevation}
      sx={{
        border: 2,
        borderColor: colore,
        boxShadow: `0px 4px 20px 0px ${colore}`,
      }}
    >
      <CardMedia sx={{ height: imgHeight }} image={`${BACKEND}${rifiuto.img_src}`} />
      <CardContent>
        <Typography textAlign="left" fontWeight="bold" color={colore}>
          {rifiuto.codice_eer}
        </Typography>
        <Typography textAlign="left">Contenitore: {rifiuto.contenitore}</Typography>
        <Typography textAlign="left">RDR: {rifiuto.codice_rdr}</Typography>

        {pericoloso && (
          <Stack direction="row" alignItems="center" alignContent="center" spacing={1}>
            <WarningAmberIcon sx={{ color: 'orange' }} />
            <Typography variant="caption" sx={{ color: colore }}>
              {rifiuto.codice_pittogramma}
            </Typography>
          </Stack>
        )}
        <Stack direction="row" alignItems="center" alignContent="center" width="100%">
          {!rifiuto.sfuso ? <CheckBoxOutlineBlankIcon /> : <CheckBoxIcon />}
          <Typography>Sfuso</Typography>
        </Stack>

        <RifiutoForm rifiuto={rifiuto} />
      </CardContent>
    </Card>
  );
}
