import React from 'react'
import OrdineItem from '../components/OrdineItem'

function ViewControlloOrdini({ordini}) {
  return (
    <div>ViewControlloOrdini
      {ordini.map((item) => (
        <OrdineItem
          portate={item.portate}
          totale={item.totale}
          tavolo={item.tavolo}
          data={item.data}
          stato={item.stato}
        />
      ))}
    </div>
  )
}

export default ViewControlloOrdini