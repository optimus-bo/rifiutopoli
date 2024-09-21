import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Rifiuto } from '../../api/rifiuti';
import RifiutoForm from './RifiutoForm';

const imgHeight = 300;
export const defaultCardElevation = 8;

type RifiutoFancyProps = {
  rifiuto: Rifiuto;
};

export default function RifiutoFancy({ rifiuto }: RifiutoFancyProps) {
  return (
    <Card elevation={defaultCardElevation}>
      <CardMedia sx={{ height: imgHeight }} image={`/api${rifiuto.img_src}`} />
      <CardContent>
        <Typography variant="caption" textAlign="left">
          {rifiuto.codice_eer}
        </Typography>
        <RifiutoForm rifiuto={rifiuto} />
      </CardContent>
    </Card>
  );
}
