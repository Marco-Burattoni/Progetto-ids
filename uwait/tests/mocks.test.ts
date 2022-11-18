import { Gestore } from "../src/model/account.model";
import {
  Attivita,
  Menu,
  StatoVerifica,
  Tipo,
} from "../src/model/attivita.model";
import { Ordine } from "../src/model/ordine.model";
import { Allergene, Portata } from "../src/model/portata.model";

export const portata: Portata = new Portata(
  "Tagliata di manzo",
  "Secondi",
  "con patate al forno",
  20.5,
  new Set<Allergene>([Allergene.Sesamo])
);
export const gestore: Gestore = new Gestore(
  "marco@mail.com",
  "Marco",
  "Verdi",
  new Date(2000, 1, 1),
  null,
  StatoVerifica.InSospeso,
  new Set<Attivita>()
);

export const attivita = new Attivita(
  "abcde12345",
  "Osteria",
  "Bologna, via Roma 20",
  gestore
);

export const menu: Menu = new Menu(
  "Menù di carne",
  true,
  [],
  Tipo.Degustazione
);

export const ordine: Ordine = new Ordine("abcdefg1234", 1, false);
