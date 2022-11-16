import { Firestore } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Entry } from "../model/log.model";

export class Controller {
  protected getDb(): Firestore {
    return db;
  }

  public inserisciEntry(entry: Entry): void {  }
}
