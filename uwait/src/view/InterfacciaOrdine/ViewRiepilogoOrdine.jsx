import React from 'react'
import CartItem from '../components/CartItem'

//passo collezione di cartItem
function ViewRiepilogoOrdine({cartItems}) {
  return (
    <div>RIEPILOGO
       
        {cartItems.map(cartItem => (
            <CartItem nomePortata={cartItem.nomePortata} prezzo={cartItem.prezzo}></CartItem>
        ) )}
    </div>
    //il totale lo calcolo qui o viene passato come props?
    //nello stato come sono salvati i cart item? Vengono ragguppati in una sorta di mappa nome-quantità
    //o sono sequenziali e devo calcolare a mano la quantità totale da cui poi ricavo il prezzo tatale?
  )
}

export default ViewRiepilogoOrdine