import { Personale } from "../src/model/account.model";
import {} from "../src/model/attivita.model";
import {} from "../src/model/ordine.model";
import {} from "../src/model/portata.model";

test("account", () => {
  let andrea: Personale = new Personale("andrea@mail.com", "Andrea", "Rossi");
  expect(andrea.email).toMatch(/@/);
});
