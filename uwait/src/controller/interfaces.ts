import { Gestore, Personale } from "../model/account.model";
import { Abbonamento, Attivita, Menu } from "../model/attivita.model";
import { Ordine, Pagamento } from "../model/ordine.model";
import { Allergene, Portata } from "../model/portata.model";

export interface ILogin{
    verificaCredenziali(mail: string, password: string): string;
}

export interface IRegistrazione {
    registaUtente(nome: string, cognome: string, mail: string, password: string): void;
    registaUtente(nome: string, cognome: string, mail: string, password: string, documentoIdentita: File): void;
}

export interface IRegistrazioneAttivita {
    registaAttivita(nome: string, indirizzo: string, documento: File): void;
}

export interface IGestioneAttivita {
    invitaPersonale(mail: string): Promise<string | null>;
    getPersonale(): Set<Personale>;
}

export interface IGestioneMenuAttivita {
    creaPortata(portata: Portata): void;
    eliminaPortata(portata: Portata): void;
    inserisciMenu(nome: string): void;
    disattivaMenu(nome: string): void;
    eliminaMenu(nome: string): void;
}

export interface IGestioneAbbonamento {
    creaAbbonamento(): Abbonamento;
    disdiciAbbonamento(): void;
    cambiaAbbonamento(isAnnuale: boolean): void;
    aggiornaDatiPagamento(pagamento: Pagamento): void;
}

export interface IGestioneStatistiche {
    calcolaStatistiche(inizio: Date, fine: Date): void;
}

export interface IGestionePersonale {
    controlloOrdini(tavolo: number): Ordine[];
}

export interface IRichiamaPersonale {
    richiamaPersonale(): void;
}

export interface IInserisciTavolo {
    inserisciTavolo(tavolo: number): void;
}

export interface IGestioneMenuCliente {
    ricerca(nome: string): Portata[];
    filtra(allergeni: Set<Allergene>): Portata[];
    visualizzaMenu(nome: string): Menu;
}

export interface IGestionePagamento {
    paga(ordine: Ordine, pagamento: Pagamento): void;
    paga(abbonamento: Abbonamento, pagamento: Pagamento): void;
}

export interface IGestioneAssistenza {
    verificaGestore(gestore: Gestore): void;
    verificaAttivita(attivita: Attivita): void;
}
