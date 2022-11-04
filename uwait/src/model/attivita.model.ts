export class Attivita {
  private _nome: string;
  private _indirizzo: string;
  private _documentoProprieta: string | null;
  private _statoVerifica: boolean;
  private _numeroTavoli: number;

  constructor(
    nome: string,
    indirizzo: string,
    numeroTavoli: number = 0,
    documentoProprieta: string | null = null,
    statoVerifica = false
  ) {
    this._nome = nome;
    this._indirizzo = indirizzo;
    this._documentoProprieta = documentoProprieta;
    this._numeroTavoli = numeroTavoli;
    this._statoVerifica = statoVerifica;
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

  public get statoVerifica(): boolean {
    return this._statoVerifica;
  }

  public set statoVerifica(value: boolean) {
    this._statoVerifica = value;
  }

  public get numeroTavoli(): number {
    return this._numeroTavoli;
  }

  public set numeroTavoli(value: number) {
    this._numeroTavoli = value;
  }
}

export class Abbonamento {
  private _attivo: boolean;
  private _scadenza: Date | null;
  private _annuale: boolean;
  private _rinnovoAutomatico: boolean;

  constructor(
    attivo: boolean = false,
    scadenza: Date | null = null,
    annuale: boolean = false,
    rinnovoAutomatico: boolean = false
  ) {
    this._attivo = attivo;
    this._annuale = annuale;
    this._scadenza = scadenza;
    this._rinnovoAutomatico = rinnovoAutomatico;
  }

  public get attivo(): boolean {
    return this._attivo;
  }

  public set attivo(value: boolean) {
    this._attivo = value;
  }

  public get annuale(): boolean {
    return this._annuale;
  }

  public set annuale(value: boolean) {
    this._annuale = value;
  }

  public get scadenza(): Date | null {
    return this._scadenza;
  }

  public set scadenza(value: Date | null) {
    this._scadenza = value;
  }

  public get rinnovoAutomatico(): boolean {
    return this._rinnovoAutomatico;
  }

  public set rinnovoAutomatico(value: boolean) {
    this._rinnovoAutomatico = value;
  }

  public rinnova() {
    this.attivo = true;

    let temp = new Date();
    if (this.annuale) {
      temp.setFullYear(temp.getFullYear() + 1);
    } else {
      temp.setMonth(temp.getMonth() + 1);
    }

    this._scadenza = temp;
  }
}