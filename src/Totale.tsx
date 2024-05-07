import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { Fragment } from 'react/jsx-runtime';

interface TotaleProps {
  rifiuti: { nome: string; qt: number }[];
}
export default function Totale({ rifiuti }: TotaleProps) {
  return (
    <Card variant="outlined" sx={{ width: 350 }}>
      <CardHeader title="Rifiuti registrati" />
      <Divider />
      <CardContent>
        {rifiuti.map((rifiuto, idx) => {
          return (
            <Fragment key={idx}>
              <Typography textAlign="left">- {rifiuto.nome}</Typography>
              <Typography variant="subtitle2" textAlign="left" ml={2}>
                {rifiuto.qt} Kg
              </Typography>
            </Fragment>
          );
        })}
      </CardContent>
    </Card>
  );
}
