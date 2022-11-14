import { Personale, Gestore } from "../src/model/account.model";
import {
  Attivita,
  Menu,
  StatoVerifica,
  Tipo,
} from "../src/model/attivita.model";
import {
  Ordine,
  Pagamento,
  PayPal,
  StatoOrdine,
} from "../src/model/ordine.model";
import { Allergene, Portata } from "../src/model/portata.model";

let portata: Portata = new Portata(
  "Tagliata di manzo",
  "Secondi",
  "con patate al forno",
  20.5,
  new Set<Allergene>([Allergene.Sesamo])
);

describe("Account", () => {
  let andrea: Personale;
  let marco: Gestore;

  beforeAll(() => {
    andrea = new Personale("andrea@mail.com", "Andrea", "Rossi");
    marco = new Gestore(
      "marco@mail.com",
      "Marco",
      "Verdi",
      new Date(2000, 1, 1),
      null,
      StatoVerifica.InSospeso,
      new Set<Attivita>()
    );
  });

  test("Personale", () => {
    expect(andrea.email).toMatch(/@/);
    expect(andrea.nome).toBe("Andrea");
    expect(andrea.cognome).toBe("Rossi");
  });

  test("Gestore", () => {
    expect(marco.attivita.values).toHaveLength(0);
  });
});

describe("Attività", () => {
  let attivita: Attivita;

  beforeAll(() => {
    attivita = new Attivita("Osteria", "Bologna, via Roma 20");
  });

  test("Attivita", () => {
    expect(attivita.nome).toBe("Osteria");
    expect(attivita.statoVerifica).toBe(StatoVerifica.InSospeso);
    expect(attivita.tavoliConRichiamo).toHaveLength(0);
    attivita.tavoliConRichiamo = [1, 2];
    expect(attivita.tavoliConRichiamo).toContain(1);
  });

  test("Abbonamento", () => {
    expect(attivita.abbonamento.isAttivo()).toBeFalsy();
    attivita.abbonamento.rinnova();
    expect(attivita.abbonamento).toBeTruthy();
  });

  test("Menu", () => {
    let menu: Menu = new Menu("Menù di carne", true, [], Tipo.Degustazione);
    expect(menu.portate).toHaveLength(0);

    menu.aggiungiPortata(portata);
    expect(menu.portate).toContain(portata);
    menu.rimuoviPortata(portata);
    expect(menu.portate).not.toContain(portata);
  });
});

describe("Ordine", () => {
  let ordine: Ordine;
  let pagamento: Pagamento;

  beforeAll(() => {
    ordine = new Ordine("abcdefg1234", 1, false);
    pagamento = new PayPal(ordine);
  });

  test("Ordine", () => {
    expect(ordine.consegnato).toBeFalsy();
    ordine.consegnato = true;
    expect(ordine.consegnato).toBeTruthy();
  });

  test("Portate", () => {
    ordine.aggiungiPortata(portata);
    expect(ordine.portate.get(portata)).toEqual(1);
    ordine.aggiungiPortata(portata);
    expect(ordine.portate.get(portata)).toEqual(2);
    expect(
      ordine.portate.get(new Portata("Pesce spada", "Antipasto", "", 14))
    ).toBeFalsy();
  });

  test("Pagamento", () => {
    expect(pagamento.ordine.statoOrdine).not.toBe(StatoOrdine.Pagato);
    pagamento.pagaOrdine();
    expect(pagamento.ordine.statoOrdine).not.toBe(StatoOrdine.Pagato);
    ordine.statoOrdine = StatoOrdine.Confermato;
    pagamento.pagaOrdine();
    expect(pagamento.ordine.statoOrdine).toBe(StatoOrdine.Pagato);
  });
});
