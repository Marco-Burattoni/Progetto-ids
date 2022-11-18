import {
  GestioneAttivitaController,
  GestioneMenuAttivitaController,
} from "../src/controller/attivita.controller";
import {} from "../src/controller/ordine.controller";
import {} from "../src/controller/personale.controller";
import { gestore, portata, attivita, menu, ordine } from "./mocks.test";

describe("Attivita", () => {
  let gestioneAttivitaController: GestioneAttivitaController =
    new GestioneAttivitaController(attivita);
  let gestioneMenuAttivitaController: GestioneMenuAttivitaController =
    new GestioneMenuAttivitaController(attivita);

  test("should first", () => {
    second;
  });
});
