import { Box, Stack } from '@mui/material';
import { useDeviceFeatures } from 'optimus-bo-ui';
import { useState } from 'react';
import { Raccolta } from '../api/raccolte';
import { Rifiuto } from '../api/rifiuti';
import ListaRifiuti from '../components/ListaRifiuti';
import MenuRaccolta from '../components/MenuRaccolta';

const rifiuti: Rifiuto[] = [
  {
    codice_cer: '1',
    imgSrc:
      'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Ftonsoffacts.com%2Fwp-content%2Fuploads%2F2020%2F04%2FEJmxzsFXUAIAC2m-1024x1024.jpg&f=1&nofb=1&ipt=6ad1882041adec29c2c47421e9a5610a9c0cef118a5aa4d976270c2e42cd4f33&ipo=images',
    nome: 'rifiuto 1',
  },
  {
    codice_cer: '2',
    imgSrc:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flp-cms-production.imgix.net%2F2019-06%2FGettyImages-160593648_high.jpg%3Ffit%3Dcrop%26q%3D40%26sharp%3D10%26vib%3D20%26auto%3Dformat%26ixlib%3Dreact-8.6.4&f=1&nofb=1&ipt=84c11424d710bcb3d672fd6292b139c0bda9a86e972c00f632e082c27f914ae0&ipo=images',
    nome: 'rifiuto 2',
  },
  {
    codice_cer: '3',
    imgSrc:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbackendcdn.vivaticket.it%2Fimg_eventi_new%2Fteatri%2FVirtus_Bologna_390x390_6351361aaae6f.png&f=1&nofb=1&ipt=4a385db93ba667dfbc09162a9cdc328eb95e488ab363d13b1fc317eb4566d515&ipo=images',
    nome: 'rifiuto 3',
  },
  {
    codice_cer: '4',
    imgSrc:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.galluranews.org%2Fwp-content%2Fuploads%2F2019%2F07%2F67000914_1208856492650044_7374982047263096832_n.jpg&f=1&nofb=1&ipt=3e78b55166d0eac41b30ceaa0b50d33ba53695d32722c1a644a1c52be884b341&ipo=images',
    nome: 'Rifiuto 4',
  },
];

export default function MainScreen() {
  const [buttati, setButtati] = useState<Raccolta[]>([]);
  const { isMobile } = useDeviceFeatures();

  function aggiorna(r: Rifiuto, aggiunta: number) {
    const raccolta_rifiuto: Raccolta = buttati.find((raccolta) => raccolta.rifiuto.codice_cer === r.codice_cer) ?? {
      rifiuto: r,
      peso: 0.0,
    };
    const altre = buttati.filter((raccolta) => raccolta.rifiuto.codice_cer !== r.codice_cer);

    raccolta_rifiuto.peso = raccolta_rifiuto.peso + aggiunta;
    setButtati([...altre, raccolta_rifiuto]);
  }

  return (
    <Box padding={2} sx={{ width: '100%' }}>
      <Stack spacing={1} direction={isMobile ? 'column' : 'row'}>
        <ListaRifiuti rifiuti={rifiuti} onSubmit={aggiorna} />
        <MenuRaccolta raccolte={buttati} />
      </Stack>
    </Box>
  );
}
