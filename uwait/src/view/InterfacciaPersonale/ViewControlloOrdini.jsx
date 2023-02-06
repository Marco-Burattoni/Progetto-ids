import React from 'react'
import OrdineItem from '../components/OrdineItem'
import { GestionePersonaleController } from "../../controller/personale.controller"
import Button from '@material-ui/core/Button';

function ViewControlloOrdini({ ordini }) {
  
  const handleConsegnaOrdine = (ordine) => {
    const controller = new GestionePersonaleController(personale, attivita);
    controller.setConsegnato(ordine);
  }

  return (
    <div>ViewControlloOrdini
      {ordini.map((item) => (
        <div>
          <OrdineItem
            portate={item.portate}
            totale={item.totale}
            tavolo={item.tavolo}
            data={item.data}
            stato={item.stato}
          />
          <Button variant="contained" color="primary" onClick={() => handleConsegnaOrdine(item)}>
            Consegna ordine
          </Button>
        </div>
      ))}
    </div>
  )
}

export default ViewControlloOrdini