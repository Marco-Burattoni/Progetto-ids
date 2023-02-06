import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
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

  private async updatePortate() {
    const arr = Array.from(this.ordine.portate, function (item) {
      return { portata: item[0].id, value: item[1] };
    });

    updateDoc(this.ordineRef, { portate: arr });
  }

  inserisci(portata: Portata, quantita: number = 1): void {
    this._ordine.modificaPortata(portata, quantita);
    this.updatePortate();
  }

  async conferma() {
    this._ordine.statoOrdine = StatoOrdine.Confermato;
    this._ordine.consegnato = false;
    await updateDoc(this.ordineRef, {
      statoOrdine: this.ordine.statoOrdine,
      consegnato: false,
      dataOra: new Date(),
      tavolo: this.ordine.tavolo,
    });
  }

  modifica(portata: Portata, quantita: number): void {
    this._ordine.modificaPortata(portata, quantita);
    this.updatePortate();
  }

  elimina(portata: Portata): void {
    this._ordine.portate.delete(portata);
    this.updatePortate();
  }

  totale(): number {
    let result: number = 0;

    this.ordine.portate.forEach((value, key) => {
      result += key.prezzo * value;
    });

    return result;
  }
}
