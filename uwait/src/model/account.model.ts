import { Attivita } from "./attivita.model";

abstract class Account {
  protected email: string;

  constructor(email: string) {
    this.email = email;
  }

  getEmail() {
    return this.email;
  }

  setEmail(email: string) {
    this.email = email;
  }
}

export class Personale extends Account {
  protected nome: string;
  protected cognome: string;
  constructor(email: string, nome: string, cognome: string) {
    super(email);
    this.nome = nome;
    this.cognome = cognome;
  }

  getNome() {
    return this.nome;
  }

  setNome(nome: string) {
    this.nome = nome;
  }

  getCognome() {
    return this.cognome;
  }

  setCognome(cognome: string) {
    this.cognome = cognome;
  }
}

export class Gestore extends Personale {
  private dataNascita!: Date;
  private documentoIdentita!: string;
  private statoVerifica!: boolean;
  private attivita!: Set<Attivita>;

  getDataNascita() {
    return this.dataNascita;
  }

  setDataNascita(dataNascita: Date) {
    this.dataNascita = dataNascita;
  }

  getDocumentoIdentita() {
    return this.documentoIdentita;
  }

  setDocumentoIdentita(documentoIdentita: string) {
    this.documentoIdentita = documentoIdentita;
  }

  getStatoVerifica() {
    return this.statoVerifica;
  }

  setStatoVerifica(statoVerifica: boolean) {
    this.statoVerifica = statoVerifica;
  }

  registraAttivita() {}
}

class Assistenza extends Account {}
