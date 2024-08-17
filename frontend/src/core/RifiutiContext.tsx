import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { Raccolta } from '../api/raccolte';
import { Rifiuto } from '../api/rifiuti';

type UseRifiutiReturn = {
  rifiutiRaccolti: Raccolta[];
  raccogliRifiuto: (rifiuto: Rifiuto, peso: number) => void;
  rimuoviRifiuto: (codice_cer: string) => void;
};

const RifiutiContext = createContext<UseRifiutiReturn>({
  rifiutiRaccolti: [],
  raccogliRifiuto: () => {},
  rimuoviRifiuto: () => {},
});

const raccolteKey = 'raccolte';

function storeRaccolte(raccolte: Raccolta[]) {
  localStorage.setItem(raccolteKey, JSON.stringify(raccolte));
}

function loadRaccolte() {
  const raccolte = localStorage.getItem(raccolteKey);
  return raccolte ? JSON.parse(raccolte) : [];
}

export default function RifiutiContextProvider({ children }: PropsWithChildren) {
  const [rifiutiRaccolti, setRifiutiRaccolti] = useState<Raccolta[]>(loadRaccolte());

  function raccogliRifiuto(rifiuto: Rifiuto, peso: number) {
    // inizializza una raccolta per questo rifiuto
    const raccolta: Raccolta = rifiutiRaccolti.find(
      (raccolta) => raccolta.rifiuto.codice_cer === rifiuto.codice_cer
    ) ?? {
      rifiuto: rifiuto,
      peso: 0.0,
    };
    // tutte le altre raccolte
    const altre = rifiutiRaccolti.filter((raccolta) => raccolta.rifiuto.codice_cer !== rifiuto.codice_cer);

    raccolta.peso = raccolta.peso + peso;
    setRifiutiRaccolti([...altre, raccolta]);
  }

  function rimuoviRifiuto(codice_cer: string) {
    const altre = rifiutiRaccolti.filter((raccolta) => raccolta.rifiuto.codice_cer !== codice_cer);

    setRifiutiRaccolti(altre);
  }

  useEffect(() => {
    storeRaccolte(rifiutiRaccolti);
  }, [rifiutiRaccolti]);

  return (
    <RifiutiContext.Provider value={{ rifiutiRaccolti, raccogliRifiuto, rimuoviRifiuto }}>
      {children}
    </RifiutiContext.Provider>
  );
}

export const useRifiuti = () => useContext(RifiutiContext);
