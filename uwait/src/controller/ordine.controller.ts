import { addDoc, collection, doc } from "firebase/firestore";
import { Ordine, StatoOrdine } from "../model/ordine.model";
import { Portata } from "../model/portata.model";
import { Controller } from "./controller";
import { IGestioneOrdine } from "./interfaces";

export class GestioneOrdineController
  extends Controller
  implements IGestioneOrdine
{
  private _ordine: Ordine;

  public constructor(tavolo: number, ordine?: Ordine) {
    super();
    if (ordine) {
      this._ordine = ordine;
    } else {
      this._ordine = new Ordine("", 0);
      addDoc(collection(this.getDb(), "ordini"), {}).then((ref) => {
        this._ordine = new Ordine(ref.id, tavolo);
      });
    }
  }

  private get ordineRef() {
    return doc(this.getDb(), "ordini", this.ordine.id);
  }

  protected get ordine(): Ordine {
    return this._ordine;
  }

  protected set ordine(value: Ordine) {
    this._ordine = value;
  }

  inserisci(portata: Portata, quantita: number = 1): void {
    this._ordine.modificaPortata(portata, quantita);

    // TODO: aggiornamento documento
  }

  conferma(ordine: Ordine): void {
    this._ordine.statoOrdine = StatoOrdine.Confermato;
    // TODO: aggiornamento documento
  }

  modifica(portata: Portata, quantita: number): void {
    this._ordine.portate.set(portata, quantita);
    // TODO: aggiornamento documento
  }

  elimina(portata: Portata): void {
    this._ordine.portate.delete(portata);
    // TODO: aggiornamento documento
  }

  totale(): number {
    let result: number = 0;

    this.ordine.portate.forEach((value, key) => {
      result += key.prezzo * value;
    });

    return result;
  }
}
