import { env } from "process";
import { isThisTypeNode } from "typescript";
import { Personale } from "../model/account.model";
import { Attivita } from "../model/attivita.model";
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

export class GestioneMenuAttivitaController extends AttivitaController implements IGestioneMenuAttivita{
  creaPortata(portata: Portata): void {
    throw new Error("Method not implemented.");
  }
  
  eliminaPortata(portata: Portata): void {
    throw new Error("Method not implemented.");
  }

  inserisciMenu(nome: string): void {
    throw new Error("Method not implemented.");
  }

  disattivaMenu(nome: string): void {
    throw new Error("Method not implemented.");
  }

  eliminaMenu(nome: string): void {
    throw new Error("Method not implemented.");
  }
  
}
