import { Portata } from "./portata.model";

export class Ordine {
  private _id: number;
  private _tavolo: number;
  private _consegnato: boolean;
  private _dataOra: Date;
  private _note: string;
  private _portate: Map<Portata, number>;

  constructor(
    id: number,
    tavolo: number,
    consegnato: boolean,
    dataOra: Date,
    note: string,
    portate: Map<Portata, number>
  ) {
    this._id = id;
    this._tavolo = tavolo;
    this._consegnato = consegnato;
    this._dataOra = dataOra;
    this._note = note;
    this._portate = portate;
  }

  public get id(): number {
    return this._id;
  }

  public set id(value: number) {
    this._id = value;
  }

  public get tavolo(): number {
    return this._tavolo;
  }

  public set tavolo(value: number) {
    this._tavolo = value;
  }

  public get consegnato(): boolean {
    return this._consegnato;
  }

  public set consegnato(value: boolean) {
    this._consegnato = value;
  }

  public get dataOra(): Date {
    return this._dataOra;
  }

  public set dataOra(value: Date) {
    this._dataOra = value;
  }

  public get note(): string {
    return this._note;
  }

  public set note(value: string) {
    this._note = value;
  }

  public get portate(): Map<Portata, number> {
    return this._portate;
  }

  public set portate(value: Map<Portata, number>) {
    this._portate = value;
  }

  public aggiungiPortata(portata: Portata) {
    if (this._portate.has(portata)) {
      this._portate.set(portata, this._portate.get(portata) || 0 + 1);
    } else {
      this._portate.set(portata, 1);
    }
  }
}
