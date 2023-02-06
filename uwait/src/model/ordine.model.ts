import { Portata } from "./portata.model";

export enum StatoOrdine {
  NelCarrello,
  Confermato,
  Pagato,
}

export class Ordine {
  private _id: string;
  private _tavolo: number;
  private _consegnato: boolean;
  private _dataOra: Date;
  private _note: string;
  private _portate: Map<Portata, number>;
  private _statoOrdine: StatoOrdine;

  constructor(
    id: string,
    tavolo: number,
    consegnato: boolean = false,
    dataOra: Date = new Date(),
    note: string = "",
    portate: Map<Portata, number> = new Map<Portata, number>(),
    statoOrdine: StatoOrdine = StatoOrdine.NelCarrello
  ) {
    this._id = id;
    this._tavolo = tavolo;
    this._consegnato = consegnato;
    this._dataOra = dataOra;
    this._note = note;
    this._portate = portate;
    this._statoOrdine = statoOrdine;
  }

  public get id(): string {
    return this._id;
  }

  public set id(value: string) {
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

  public get statoOrdine(): StatoOrdine {
    return this._statoOrdine;
  }

  public set statoOrdine(value: StatoOrdine) {
    this._statoOrdine = value;
  }

  public aggiungiPortata(portata: Portata) {
    let count = this._portate.get(portata) ?? 0;
    this._portate.set(portata, count + 1);
  }

  public modificaPortata(portata: Portata, quantita: number) {
    for (let p of this.portate.keys()) {
      if (p.id === portata.id) {
        portata = p;
        break;
      }
    }

    this._portate.set(portata, quantita);
  }

  public getQuantita(portata: Portata): number {
    if (this.portate.keys())
      for (let p of this.portate.keys()) {
        if (p.id === portata.id) {
          return this.portate.get(p) ?? 0;
        }
      }

    return 0;
  }

  // alla conferma controllo che il numero del tavolo sia positivo
}

export abstract class Pagamento {
  private _ordine: Ordine;

  public constructor(ordine: Ordine) {
    this._ordine = ordine;
  }

  public get ordine(): Ordine {
    return this._ordine;
  }

  public set ordine(value: Ordine) {
    this._ordine = value;
  }

  public pagaOrdine(): void {
    if (this._ordine.statoOrdine === StatoOrdine.Confermato)
      this._ordine.statoOrdine = StatoOrdine.Pagato;
  }
}

export class CartaDiCredito extends Pagamento {
  private _nomeCognome: string;
  private _codice: string;
  private _cvv: string;
  private _scadenza: Date;

  public constructor(
    ordine: Ordine,
    nomeCognome: string,
    codice: string,
    cvv: string,
    scadenza: Date
  ) {
    super(ordine);
    this._nomeCognome = nomeCognome;
    this._codice = codice;
    this._cvv = cvv;
    this._scadenza = scadenza;
  }

  public get nomeCognome(): string {
    return this._nomeCognome;
  }

  public set nomeCognome(value: string) {
    this._nomeCognome = value;
  }

  public get codice(): string {
    return this._codice;
  }

  public set codice(value: string) {
    this._codice = value;
  }

  public get cvv(): string {
    return this._cvv;
  }

  public set cvv(value: string) {
    this._cvv = value;
  }

  public get scadenza(): Date {
    return this._scadenza;
  }

  public set scadenza(value: Date) {
    this._scadenza = value;
  }
}

export class PayPal extends Pagamento {}
