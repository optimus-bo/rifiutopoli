import { Grid } from '@mui/material';
import Rifiuto from './Rifiuto';

const rifiuti = [
  {
    img: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Ftonsoffacts.com%2Fwp-content%2Fuploads%2F2020%2F04%2FEJmxzsFXUAIAC2m-1024x1024.jpg&f=1&nofb=1&ipt=6ad1882041adec29c2c47421e9a5610a9c0cef118a5aa4d976270c2e42cd4f33&ipo=images',
    nome: 'rifiuto 1',
  },
  {
    img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flp-cms-production.imgix.net%2F2019-06%2FGettyImages-160593648_high.jpg%3Ffit%3Dcrop%26q%3D40%26sharp%3D10%26vib%3D20%26auto%3Dformat%26ixlib%3Dreact-8.6.4&f=1&nofb=1&ipt=84c11424d710bcb3d672fd6292b139c0bda9a86e972c00f632e082c27f914ae0&ipo=images',
    nome: 'rifiuto 2',
  },
  {
    img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbackendcdn.vivaticket.it%2Fimg_eventi_new%2Fteatri%2FVirtus_Bologna_390x390_6351361aaae6f.png&f=1&nofb=1&ipt=4a385db93ba667dfbc09162a9cdc328eb95e488ab363d13b1fc317eb4566d515&ipo=images',
    nome: 'rifiuto 3',
  },
];

export default function MainScreen() {
  return (
    <Grid container spacing={2}>
      {rifiuti.map((rifiuto, idx) => {
        return (
          <Grid item key={idx} md={3}>
            <Rifiuto rifiuto={rifiuto} key={idx} butta={() => {}} />
          </Grid>
        );
      })}
    </Grid>
  );
}
