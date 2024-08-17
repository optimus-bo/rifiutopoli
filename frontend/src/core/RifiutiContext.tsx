import { createContext, PropsWithChildren, useContext, useState } from 'react';
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

export default function RifiutiContextProvider({ children }: PropsWithChildren) {
  const [rifiutiRaccolti, setRifiutiRaccolti] = useState<Raccolta[]>([]);

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

  return (
    <RifiutiContext.Provider value={{ rifiutiRaccolti, raccogliRifiuto, rimuoviRifiuto }}>
      {children}
    </RifiutiContext.Provider>
  );
}

export const useRifiuti = () => useContext(RifiutiContext);
