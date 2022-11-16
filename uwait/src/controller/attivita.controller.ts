import { env } from "process";
import { isThisTypeNode } from "typescript";
import { Personale } from "../model/account.model";
import { Attivita, Menu } from "../model/attivita.model";
import { Controller } from "./controller";
import { IGestioneAttivita, IGestioneMenuAttivita } from "./interfaces";
import {
  doc,
  collection,
  query,
  where,
  getDoc,
  getDocs,
  setDoc,
  DocumentReference,
  DocumentData,
  addDoc,
} from "firebase/firestore";
import { Portata } from "../model/portata.model";

class AttivitaController extends Controller {
  private _attivita: Attivita;

  public constructor(attivita: Attivita) {
    super();
    this._attivita = attivita;
  }

  public get attivita(): Attivita {
    return this.attivita;
  }

  protected get attivitaRef(): DocumentReference<DocumentData> {
    return doc(this.getDb(), this.attivita.gestore.email, this.attivita.id);
  }
}

export class GestioneAttivitaController
  extends AttivitaController
  implements IGestioneAttivita
{
  async invitaPersonale(mail: string): Promise<string | null> {
    const q = query(
      collection(this.getDb(), "accounts"),
      where("email", "==", mail)
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const attivitaRef = this.attivitaRef;

      const attivita = (await getDoc(attivitaRef)).data();
      attivita?.personale.push(querySnapshot.docs[0].ref);

      await setDoc(attivitaRef, querySnapshot.docs[0].ref);

      return env.PUBLIC_URL + "/" + this.attivita.id;
    } else return null;
  }

  getPersonale(): Set<Personale> {
    return this.attivita.personale;
  }
}

export class GestioneMenuAttivitaController
  extends AttivitaController
  implements IGestioneMenuAttivita
{
  private _menuAttivo: Menu;

  public constructor(attivita: Attivita) {
    super(attivita);
    this._menuAttivo = attivita.menu.keys().next().value;
  }

  public get menuAttivo(): Menu {
    return this._menuAttivo;
  }

  public set menuAttivo(value: Menu) {
    this._menuAttivo = value;
  }

  public get menuAttivoRef() {
    return doc(
      this.getDb(),
      this.attivitaRef.path,
      "menu",
      this.menuAttivo.nome
    );
  }

  creaPortata(portata: Portata): void {
    this.menuAttivo.aggiungiPortata(portata);
  }

  rimuoviPortata(portata: Portata): void {
    this.menuAttivo.rimuoviPortata(portata);
  }

  inserisciMenu(nome: string): void {
    const menu = new Menu(nome);
    this.attivita.aggiungiMenu(menu);
    this.menuAttivo = menu;
    addDoc(collection(this.getDb(), this.attivitaRef.path, "menu"), menu);
  }

  disattivaMenu(nome: string): void {
    this.attivita.menu.forEach((menu) => {
      if (menu.nome === nome) {
        menu.attivo = false;
      }
    });
  }

  eliminaMenu(nome: string): void {
    this.attivita.menu.forEach((menu) => {
      if (menu.nome === nome) {
        this.attivita.menu.delete(menu);
        return;
      }
    });
  }

  selezionaMenu(nome: string): void {
    this.attivita.menu.forEach((menu) => {
      if (menu.nome === nome) {
        this.menuAttivo = menu;
        return;
      }
    });
  }

  salvaMenu(): void {
    setDoc(this.menuAttivoRef, this._menuAttivo);
    const portateRef = collection(
      this.getDb(),
      this.menuAttivoRef.path,
      "portate"
    );
    this.menuAttivo.portate.forEach((portata) => {
      if (portata.id) {
        const portataRef = doc(this.getDb(), portateRef.path, portata.id);
        setDoc(portataRef, portata);
      } else {
        addDoc(portateRef, portata)
          .then((doc) => getDoc(doc))
          .then((doc) => doc.id)
          .then((id) => {
            portata.id = id;
          });
      }
    });
  }
}
