import {
  GestioneAttivitaController,
  GestioneMenuAttivitaController,
} from "../src/controller/attivita.controller";
import {} from "../src/controller/ordine.controller";
import {
  GestioneOrdinePersonaleController,
  GestionePersonaleController,
} from "../src/controller/personale.controller";
import { Ordine } from "../src/model/ordine.model";
import { portata, attivita, ordine, personale } from "./mocks.test";

describe("Controller Attività", () => {
  let gestioneAttivitaController: GestioneAttivitaController =
    new GestioneAttivitaController(attivita);
  let gestioneMenuAttivitaController: GestioneMenuAttivitaController =
    new GestioneMenuAttivitaController(attivita);

  test("Invito a personale", async () => {
    let invito = await gestioneAttivitaController.invitaPersonale(
      "personale@gmail.com"
    );
    expect(invito).toContain(attivita.id);
  });

  test("Selezione e modifica menu", async () => {
    let menus = attivita.menu;
    gestioneMenuAttivitaController.menuAttivo = menus.keys().next().value;

    gestioneMenuAttivitaController.creaPortata(portata);
    expect(gestioneMenuAttivitaController.menuAttivo.portate).toContain(
      portata
    );

    gestioneMenuAttivitaController.rimuoviPortata(portata);
    expect(gestioneMenuAttivitaController.menuAttivo.portate).not.toContain(
      portata
    );

    gestioneMenuAttivitaController.salvaMenu();
  });
});

describe("Controller Personale", () => {
  let gestionePersonaleController: GestionePersonaleController =
    new GestionePersonaleController(personale, attivita);
  let gestioneOrdinePersonaleController: GestioneOrdinePersonaleController =
    new GestioneOrdinePersonaleController(1, ordine);

  test("Controllo ordini", async () => {
    let ordini: Ordine[] = await gestionePersonaleController.controlloOrdini();
    expect(ordini[0].consegnato).toBeFalsy();
  });

  test("Gestione richiamo personale", async () => {
    let richiamo: number = attivita.tavoliConRichiamo[0];
    await gestionePersonaleController.richiamoGestito(richiamo);
    expect(attivita.tavoliConRichiamo).not.toContain(richiamo);
  });

  test("Controller gestione ordine del personale", () => {
    let nota = "Secondo senza patate";
    gestioneOrdinePersonaleController.modificaNote(nota);
    expect(ordine.note).toBe(nota);
  });
});
