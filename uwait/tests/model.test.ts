import { Personale } from "../src/model/account.model";
import { StatoVerifica } from "../src/model/attivita.model";
import { Pagamento, PayPal, StatoOrdine } from "../src/model/ordine.model";
import { Portata } from "../src/model/portata.model";
import { gestore, portata, attivita, menu, ordine } from "./mocks.test";

describe("Account", () => {
  let andrea: Personale;

  beforeAll(() => {
    andrea = new Personale("andrea@mail.com", "Andrea", "Rossi");
  });

  test("Personale", () => {
    expect(andrea.email).toMatch(/@/);
    expect(andrea.nome).toBe("Andrea");
    expect(andrea.cognome).toBe("Rossi");
  });

  test("Gestore", () => {
    expect(gestore.attivita.values).toHaveLength(0);
  });
});

describe("Attività", () => {
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
    expect(menu.portate).toHaveLength(0);

    menu.aggiungiPortata(portata);
    expect(menu.portate).toContain(portata);
    menu.rimuoviPortata(portata);
    expect(menu.portate).not.toContain(portata);
  });
});

describe("Ordine", () => {
  let pagamento: Pagamento;

  beforeAll(() => {
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
