import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { fetchMenus } from "../firebase/firebase.utils";
import { Personale } from "../model/account.model";
import { Attivita, Menu } from "../model/attivita.model";
import { Ordine, StatoOrdine } from "../model/ordine.model";
import { Portata } from "../model/portata.model";
import { AttivitaController } from "./attivita.controller";
import { Controller } from "./controller";
import { IGestionePersonale, IInserimentoNote } from "./interfaces";
import { GestioneOrdineController } from "./ordine.controller";

export class GestionePersonaleController
  extends Controller
  implements IGestionePersonale
{
  private _personale: Personale;
  private _attivita: Attivita;

  public constructor(personale: Personale, attivita: Attivita) {
    super();
    this._personale = personale;
    this._attivita = attivita;
  }

  public get personale(): Personale {
    return this._personale;
  }

  public get attivita(): Attivita {
    return this._attivita;
  }

  private get attivitaRef() {
    const attivitaController = new AttivitaController(this._attivita);
    const attivitaRef = attivitaController.attivitaRef;
    return attivitaRef;
  }

  public async controlloOrdini(): Promise<Ordine[]> {
    let result: Ordine[] = [];
    let menu: Menu = (await fetchMenus(this.attivita.id))[0];

    const q = query(
      collection(this.getDb(), "ordini"),
      where("attivitaId", "==", this.attivita.id),
      where("consegnato", "!=", true),
      where("statoOrdine", "==", StatoOrdine.Confermato)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const docData = doc.data();

      let order = new Ordine(
        doc.id,
        docData?.tavolo,
        docData?.consegnato || false,
        docData?.dataOra || new Date(),
        docData?.note || "",
        new Map<Portata, number>(),
        docData?.statoOrdine || StatoOrdine.NelCarrello
      );

      if (docData) {
        for (let portata of docData.portate) {
          for (let p of menu.portate) {
            if (p.id === portata.portata && portata.value)
              order.modificaPortata(p, portata.value);
          }
        }
      }

      result.push(order);
    });

    console.log(result);

    return result;
  }

  public setConsegnato(ordine: Ordine) {
    ordine.consegnato = true;

    const docRef = doc(this.getDb(), "ordini", ordine.id);
    setDoc(docRef, { consegnato: true });
  }

  public richiamoGestito(tavolo: number): Promise<void> {
    this._attivita.tavoliConRichiamo.splice(
      this._attivita.tavoliConRichiamo.indexOf(tavolo),
      1
    );
    return setDoc(this.attivitaRef, {
      richiami: this._attivita.tavoliConRichiamo,
    });
  }
}

export class GestioneOrdinePersonaleController
  extends GestioneOrdineController
  implements IInserimentoNote
{
  modificaNote(note: string): void {
    this.ordine.note = note;
    // TODO: aggiornamento documento
  }
}
