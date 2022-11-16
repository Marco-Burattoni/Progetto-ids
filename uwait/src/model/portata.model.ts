export class Portata {
  private _id?: string | undefined;
  private _nome: string;
  private _categoria: string;
  private _descrizione: string;
  private _prezzo: number;
  private _allergeni: Set<Allergene>;

  constructor(
    nome: string,
    categoria: string,
    descrizione: string,
    prezzo: number,
    allergeni: Set<Allergene> = new Set<Allergene>()
  ) {
    this._nome = nome;
    this._categoria = categoria;
    this._descrizione = descrizione;
    this._prezzo = prezzo;
    this._allergeni = allergeni;
  }
  
  public get id(): string | undefined {
    return this._id;
  }
  
  public set id(value: string | undefined) {
    this._id = value;
  }

  get nome(): string {
    return this._nome;
  }

  set nome(value: string) {
    this._nome = value;
  }

  public get categoria(): string {
    return this._categoria;
  }

  public set categoria(value: string) {
    this._categoria = value;
  }

  public get descrizione(): string {
    return this._descrizione;
  }

  public set descrizione(value: string) {
    this._descrizione = value;
  }

  public get prezzo(): number {
    return this._prezzo;
  }

  public set prezzo(value: number) {
    this._prezzo = value;
  }

  public get allergeni(): Set<Allergene> {
    return this._allergeni;
  }
  
  public set allergeni(value: Set<Allergene>) {
    this._allergeni = value;
  }
}

export enum Allergene {
  Cereali,
  Crostacei,
  Uova,
  Pesce,
  Arachidi,
  Soia,
  Latte,
  FruttaConGuscio,
  Sedano,
  Senape,
  Sesamo,
  AnidrideSolforosaSolfiti,
  Lupini,
  Molluschi,
}
