import React from "react";
import CartItem from "../components/CartItem";

// Ordine
// composto da:
// Timestamp
// Voci del menù
// selezionate
// Tavolo
// Prezzo totale
//passo collezione di cartItem

function ViewRiepilogoOrdine({ ordine }) {
  if (ordine) {
    const { cartItems, totale, tavolo, data } = ordine;

    return (
      <div>
        RIEPILOGO
        {cartItems.map((cartItem) => (
          <CartItem
            nomePortata={cartItem.nomePortata}
            prezzo={cartItem.prezzo}
          ></CartItem>
        ))}
        <p>Totale: {totale} </p>
        <p>Tavolo: {tavolo} </p>
        <p>Data: {data} </p>
      </div>
    );
  } else {
    return <div></div>;
  }

  //il totale lo calcolo qui o viene passato come props?
  //nello stato come sono salvati i cart item? Vengono ragguppati in una sorta di mappa nome-quantità
  //o sono sequenziali e devo calcolare a mano la quantità totale da cui poi ricavo il prezzo tatale?
  //come si associa il tavolo all'ordine?
}

export default ViewRiepilogoOrdine;
