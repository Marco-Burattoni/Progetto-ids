import { auth, db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  getDoc,
  doc,
} from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Attivita, Menu } from "../model/attivita.model";
import { Portata } from "../model/portata.model";
import { Ordine, StatoOrdine } from "../model/ordine.model";
import { Gestore, Personale } from "../model/account.model";

export async function signIn(email: string, password: string): Promise<any> {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  // controllo se esiste un gestore con questo id
  const gestore = await getDoc(doc(db, "gestori", user.uid));
  if (gestore.exists()) {
    return {
      isGestore: true,
      account: gestore.data(),
    };
  } else {
    // è nel personale
    const personale = await getDoc(doc(db, "personale", user.uid));
    if (personale.exists() && personale.data()) {
      const personaleData = personale.data();
      return {
        isGestore: false,
        account: new Personale(
          personaleData.email,
          personaleData.nome,
          personaleData.cognome
        ),
        attivita: personaleData.attivita,
      };
    } else {
      return {
        isGestore: false,
        account: null,
      };
    }
  }
}

export async function fetchMenus(attivitaId: string): Promise<Menu[]> {
  const menuCollRef = collection(db, "attivita", attivitaId, "menu");

  let menus = await getDocs(menuCollRef);
  let result: Menu[] = [];

  for (let menuDoc of menus.docs) {
    let menuData = menuDoc.data();
    let portateDocs = await getDocs(
      collection(db, menuDoc.ref.path, "portate")
    );
    let portate: Portata[] = [];

    for (let portataDoc of portateDocs.docs) {
      let portataData = portataDoc.data();
      let entry: Portata = new Portata(
        portataData.nome,
        portataData.categoria,
        portataData.descrizione,
        portataData.prezzo,
        portataData.allergeni ?? []
      );
      entry.id = portataDoc.id;
      portate.push(entry);
    }
    result.push(
      new Menu(menuData.nome, menuData.attivo, portate, menuData.tipo)
    );
  }

  return result;
}

export async function createOrder(
  attivitaId: string,
  tavolo: number
): Promise<Ordine> {
  const docRef = await addDoc(collection(db, "ordini"), {
    attivitaId,
    tavolo: tavolo,
  });
  let order = new Ordine(docRef.id, tavolo);
  setDoc(docRef, { attivitaId, tavolo: order.tavolo });
  return order;
}

export async function fetchOrder(
  menu: Menu,
  orderId: string
): Promise<Ordine | null> {
  const docRef = await getDoc(doc(db, "ordini", orderId));
  const docData = docRef.data();

  if (docData) {
    let order = new Ordine(
      orderId,
      docData?.tavolo,
      docData?.consegnato || false,
      docData?.dataOra || new Date(),
      docData?.note || "",
      new Map<Portata, number>(),
      docData?.statoOrdine || StatoOrdine.NelCarrello
    );

    if (docData?.portate) {
      for (let portata of docData.portate) {
        for (let p of menu.portate) {
          if (p.id === portata.portata && portata.value)
            order.modificaPortata(p, portata.value);
        }
      }
    }

    return order;
  } else {
    return null;
  }
}

export async function fetchAttivita(
  attivitaId: string
): Promise<Attivita | null> {
  const attivitaDoc = await getDoc(doc(db, "attivita", attivitaId));
  const data = attivitaDoc.data();
  if (data) {
    const gestoreDoc = await getDoc(doc(db, data.gestore.path));
    const gestoreData = gestoreDoc.data();
    if (gestoreData) {
      const gestore = new Gestore(
        gestoreData.email,
        gestoreData.nome,
        gestoreData.cognome
      );

      return new Attivita(attivitaId, data.nome, data.indirizzo, gestore);
    } else return null;
  }
  return null;
}
