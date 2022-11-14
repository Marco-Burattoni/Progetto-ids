import { Attivita, StatoVerifica } from "./attivita.model";

abstract class Account {
  protected _email: string;

  constructor(email: string) {
    this._email = email;
  }

  public get email(): string {
    return this._email;
  }

  public set email(value: string) {
    this._email = value;
  }
}

export class Personale extends Account {
  private _nome: string;
  private _cognome: string;

  constructor(email: string, nome: string, cognome: string) {
    super(email);
    this._nome = nome;
    this._cognome = cognome;
  }

  public get nome(): string {
    return this._nome;
  }

  public set nome(value: string) {
    this._nome = value;
  }

  public get cognome(): string {
    return this._cognome;
  }

  public set cognome(value: string) {
    this._cognome = value;
  }
}

export class Gestore extends Personale {
  private _dataNascita: Date | null;
  private _documentoIdentita: string | null;
  private _statoVerifica: StatoVerifica;
  private _attivita: Set<Attivita>;

  constructor(
    email: string,
    nome: string,
    cognome: string,
    dataNascita: Date | null = null,
    documentoIdentita: string | null = null,
    statoVerifica: StatoVerifica = StatoVerifica.InSospeso,
    attivita: Set<Attivita> = new Set<Attivita>()
  ) {
    super(email, nome, cognome);
    this._dataNascita = dataNascita;
    this._documentoIdentita = documentoIdentita;
    this._statoVerifica = statoVerifica;
    this._attivita = attivita;
  }

  public get dataNascita(): Date | null {
    return this._dataNascita;
  }

  public set dataNascita(value: Date | null) {
    this._dataNascita = value;
  }

  public get documentoIdentita(): string | null {
    return this._documentoIdentita;
  }

  public set documentoIdentita(value: string | null) {
    this._documentoIdentita = value;
  }

  public get statoVerifica(): StatoVerifica {
    return this._statoVerifica;
  }

  public set statoVerifica(value: StatoVerifica) {
    this._statoVerifica = value;
  }

  public get attivita(): Set<Attivita> {
    return this._attivita;
  }

  public set attivita(value: Set<Attivita>) {
    this._attivita = value;
  }

  public registraAttivita(attivita: Attivita): void {
    this._attivita.add(attivita);
  }
}

export class Assistenza extends Account {}
