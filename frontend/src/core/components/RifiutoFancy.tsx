import { Card, CardContent, CardMedia } from '@mui/material';
import { Rifiuto } from '../../api/rifiuti';
import RifiutoForm from './RifiutoForm';

const imgHeight = 300;

type RifiutoFancyProps = {
  rifiuto: Rifiuto;
};

export default function RifiutoFancy({ rifiuto }: RifiutoFancyProps) {
  return (
    <Card elevation={8}>
      <CardMedia sx={{ height: imgHeight }} image={rifiuto.imgSrc} />
      <CardContent>
        <RifiutoForm rifiuto={rifiuto} />
      </CardContent>
    </Card>
  );
}