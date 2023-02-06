import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { Personale } from "../model/account.model";
import { Attivita } from "../model/attivita.model";
import { Ordine, StatoOrdine } from "../model/ordine.model";
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

    const attivitaRef = this.attivitaRef;
    const q = query(
      collection(this.getDb(), "ordini"),
      where("attivita", "==", attivitaRef),
      where("consegnato", "==", false)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      result.push(
        new Ordine(
          doc.id,
          data.tavolo,
          data.consegnato,
          data.dataOra,
          data.note,
          data.portate,
          data.statoOrdine
        )
      );
    });

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
