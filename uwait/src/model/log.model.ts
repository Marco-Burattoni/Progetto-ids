export enum Contesto {
    Registrazione,
    RegistrazioneAttivita,
    Login, 
    PagamentoOrdine, 
    PagamentoAbbonamento
}

export class Entry {
    private _dataOra: Date;
    private _messaggio: string;
    private _contesto: Contesto;

    constructor(dataOra: Date, messaggio: string, contesto: Contesto) {
        this._dataOra = dataOra;
        this._messaggio = messaggio;
        this._contesto = contesto;   
    }

    public get dataOra(): Date {
        return this._dataOra;
    }

    public get messaggio(): string {
        return this._messaggio;
    }

    public get contesto(): Contesto {
        return this._contesto;
    }
}