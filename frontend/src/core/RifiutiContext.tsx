import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { RaccoltaCreate } from '../api/raccolte';
import { Rifiuto } from '../api/rifiuti';

type UseRifiutiReturn = {
  rifiutiRaccolti: RaccoltaCreate[];
  raccogliRifiuto: (rifiuto: Rifiuto, peso: number) => void;
  rimuoviRifiuto: (codice_eer: string) => void;
  svuotaRaccolti: () => void;
};

const RifiutiContext = createContext<UseRifiutiReturn>({
  rifiutiRaccolti: [],
  raccogliRifiuto: () => {},
  rimuoviRifiuto: () => {},
  svuotaRaccolti: () => {},
});

const raccolteKey = 'raccolte';

function storeRaccolte(raccolte: RaccoltaCreate[]) {
  localStorage.setItem(raccolteKey, JSON.stringify(raccolte));
}

function loadRaccolte() {
  const raccolte = localStorage.getItem(raccolteKey);
  return raccolte ? JSON.parse(raccolte) : [];
}

export default function RifiutiContextProvider({ children }: PropsWithChildren) {
  const [rifiutiRaccolti, setRifiutiRaccolti] = useState<RaccoltaCreate[]>(loadRaccolte());

  function raccogliRifiuto(rifiuto: Rifiuto, peso: number) {
    // inizializza una raccolta per questo rifiuto
    const raccolta: RaccoltaCreate = rifiutiRaccolti.find(
      (raccolta) => raccolta.rifiuto.codice_eer === rifiuto.codice_eer
    ) ?? {
      rifiuto: rifiuto,
      peso: 0.0,
    };
    // tutte le altre raccolte
    const altre = rifiutiRaccolti.filter((raccolta) => raccolta.rifiuto.codice_eer !== rifiuto.codice_eer);

    raccolta.peso = raccolta.peso + peso;
    setRifiutiRaccolti([...altre, raccolta]);
  }

  function rimuoviRifiuto(codice_eer: string) {
    const altre = rifiutiRaccolti.filter((raccolta) => raccolta.rifiuto.codice_eer !== codice_eer);

    setRifiutiRaccolti(altre);
  }

  function svuotaRaccolti() {
    setRifiutiRaccolti([]);
  }

  useEffect(() => {
    storeRaccolte(rifiutiRaccolti);
  }, [rifiutiRaccolti]);

  return (
    <RifiutiContext.Provider value={{ rifiutiRaccolti, raccogliRifiuto, rimuoviRifiuto, svuotaRaccolti }}>
      {children}
    </RifiutiContext.Provider>
  );
}

export const useRifiuti = () => useContext(RifiutiContext);
