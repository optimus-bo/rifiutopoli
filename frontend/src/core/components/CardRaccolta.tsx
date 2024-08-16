import { Typography } from '@mui/material';
import { Raccolta } from '../../api/raccolte';

type CardRaccoltaProps = {
  raccolta: Raccolta;
};

export default function CardRaccolta({ raccolta }: CardRaccoltaProps) {
  return (
    <>
      <Typography textAlign="left">- {raccolta.rifiuto.nome}</Typography>
      <Typography variant="subtitle2" textAlign="left" ml={2}>
        {raccolta.peso} Kg
      </Typography>
    </>
  );
}
