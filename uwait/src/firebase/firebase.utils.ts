import { db } from "./firebase";
import { collection, addDoc, getDocs, setDoc } from "firebase/firestore";
import { Menu } from "../model/attivita.model";
import { Portata } from "../model/portata.model";
import { Ordine } from "../model/ordine.model";

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
      portate.push(
        new Portata(
          portataData.nome,
          portataData.categoria,
          portataData.descrizione,
          portataData.prezzo,
          portataData.allergeni ?? []
        )
      );
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