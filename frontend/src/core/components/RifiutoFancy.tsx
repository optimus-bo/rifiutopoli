import { Card, CardContent, CardMedia } from '@mui/material';
import { Rifiuto } from '../../api/rifiuti';
import RifiutoForm from './RifiutoForm';

const imgHeight = 300;

type RifiutoFancyProps = {
  rifiuto: Rifiuto;
  butta: (nome: Rifiuto, peso: number) => void;
};

export default function RifiutoFancy({ rifiuto, butta }: RifiutoFancyProps) {
  return (
    <Card elevation={8}>
      <CardMedia sx={{ height: imgHeight }} image={rifiuto.imgSrc} />
      <CardContent>
        <RifiutoForm rifiuto={rifiuto} butta={butta} />
      </CardContent>
    </Card>
  );
}
