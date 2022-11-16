import { Gestore, Personale } from "./account.model";
import { Portata } from "./portata.model";

export enum StatoVerifica {
  InSospeso,
  Accettata,
  Negata,
}

export class Attivita {
  private _id: string;
  private _nome: string;
  private _indirizzo: string;
  private _documentoProprieta: string | null;
  private _statoVerifica: StatoVerifica;
  private _tavoliConRichiamo: number[];
  private _menu: Set<Menu>;
  private _abbonamento: Abbonamento;
  private _personale: Set<Personale>;
  private _gestore: Gestore;

  constructor(
    id: string,
    nome: string,
    indirizzo: string,
    gestore: Gestore,
    tavoliConRichiamo: number[] = [],
    documentoProprieta: string | null = null,
    statoVerifica: StatoVerifica = StatoVerifica.InSospeso,
    menu: Set<Menu> = new Set<Menu>(),
    abbonamento: Abbonamento = new Abbonamento(),
    personale: Set<Personale> = new Set<Personale>()
  ) {
    this._id = id;
    this._nome = nome;
    this._indirizzo = indirizzo;
    this._gestore = gestore;
    this._documentoProprieta = documentoProprieta;
    this._tavoliConRichiamo = tavoliConRichiamo;
    this._statoVerifica = statoVerifica;
    this._menu = menu;
    this._abbonamento = abbonamento;
    this._personale = personale;
  }

  public get id(): string {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;
  }

  public get nome(): string {
    return this._nome;
  }

  public set nome(value: string) {
    this._nome = value;
  }

  public get indirizzo(): string {
    return this._indirizzo;
  }

  public set indirizzo(value: string) {
    this._indirizzo = value;
  }

  public get documentoProprieta(): string | null {
    return this._documentoProprieta;
  }

  public set documentoProprieta(value: string | null) {
    this._documentoProprieta = value;
  }

  public get statoVerifica(): StatoVerifica {
    return this._statoVerifica;
  }

  public set statoVerifica(value: StatoVerifica) {
    this._statoVerifica = value;
  }

  public get tavoliConRichiamo(): number[] {
    return this._tavoliConRichiamo;
  }

  public set tavoliConRichiamo(value: number[]) {
    this._tavoliConRichiamo = value;
  }

  public get menu(): Set<Menu> {
    return this._menu;
  }

  public get abbonamento(): Abbonamento {
    return this._abbonamento;
  }

  public set abbonamento(value: Abbonamento) {
    this._abbonamento = value;
  }

  public get personale(): Set<Personale> {
    return this._personale;
  }

  public set personale(value: Set<Personale>) {
    this._personale = value;
  }

  public get gestore(): Gestore {
    return this._gestore;
  }

  public set gestore(value: Gestore) {
    this._gestore = value;
  }

  public aggiungiMenu(menu: Menu): void {
    this._menu.add(menu);
  }
}

export class Abbonamento {
  private _scadenza: Date;
  private _annuale: boolean;
  private _rinnovoAutomatico: boolean;

  constructor(
    scadenza: Date | null = null,
    annuale: boolean = false,
    rinnovoAutomatico: boolean = false
  ) {
    if (scadenza) {
      this._scadenza = scadenza;
    } else {
      let yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      this._scadenza = yesterday;
    }
    this._annuale = annuale;
    this._rinnovoAutomatico = rinnovoAutomatico;
  }

  public isAttivo(): boolean {
    return this._scadenza > new Date();
  }

  public get annuale(): boolean {
    return this._annuale;
  }

  public set annuale(value: boolean) {
    this._annuale = value;
  }

  public get scadenza(): Date {
    return this._scadenza;
  }

  public set scadenza(value: Date) {
    this._scadenza = value;
  }

  public get rinnovoAutomatico(): boolean {
    return this._rinnovoAutomatico;
  }

  public set rinnovoAutomatico(value: boolean) {
    this._rinnovoAutomatico = value;
  }

  public rinnova() {
    let temp = new Date();
    if (this.annuale) {
      temp.setFullYear(temp.getFullYear() + 1);
    } else {
      temp.setMonth(temp.getMonth() + 1);
    }

    this._scadenza = temp;
  }
}

export enum Tipo {
  Fisso,
  AllaCarta,
  Degustazione,
}

export class Menu {
  private _nome: string;
  private _attivo: boolean;
  private _portate: Array<Portata>;
  private _tipo: Tipo;

  constructor(
    nome: string,
    attivo: boolean = false,
    portate: Array<Portata> = [],
    tipo: Tipo = Tipo.AllaCarta
  ) {
    this._nome = nome;
    this._attivo = attivo;
    this._portate = portate;
    this._tipo = tipo;
  }

  public get nome(): string {
    return this._nome;
  }

  public set nome(value: string) {
    this._nome = value;
  }

  public get attivo(): boolean {
    return this._attivo;
  }

  public set attivo(value: boolean) {
    this._attivo = value;
  }

  public get portate(): Array<Portata> {
    return this._portate;
  }

  public get tipo(): Tipo {
    return this._tipo;
  }

  public set tipo(value: Tipo) {
    this._tipo = value;
  }

  public aggiungiPortata(portata: Portata): void {
    this._portate.push(portata);
  }

  public rimuoviPortata(portata: Portata): void {
    this._portate.splice(this._portate.indexOf(portata), 1);
  }
}
