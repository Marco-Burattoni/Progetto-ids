import React, { useContext, useEffect, useState } from "react";
import OrdineItem from "../components/OrdineItem";
import { GestionePersonaleController } from "../../controller/personale.controller";
import Button from "@material-ui/core/Button";
import { AppContext } from "../../App";
import { signIn, fetchAttivita } from "../../firebase/firebase.utils";

function ViewControlloOrdini() {
  const { personale, setPersonale, setGestore } = useContext(AppContext);

  const [ordini, setOrdini] = useState([]);
  const [attivita, setAttivita] = useState(null);

  useEffect(() => {
    signIn("personale@gmail.com", "password1").then((accountData) => {
      if (accountData.isGestore) {
        setGestore(accountData.account);
      } else {
        if (accountData.account !== null) {
          setPersonale(accountData.account);
          setAttivita(accountData.attivita[0]);
        }
      }
    });
  }, []);

  useEffect(() => {
    (async function () {
      if (personale && attivita) {
        const personaleController = new GestionePersonaleController(
          personale,
          await fetchAttivita(attivita)
        );
        setOrdini(await personaleController.controlloOrdini());
      }
    })();
  }, [personale, attivita]);

  const handleConsegnaOrdine = (ordine) => {
    const controller = new GestionePersonaleController(personale, attivita);
    controller.setConsegnato(ordine);
  };

  return (
    <div>
      {ordini.map((item) => (
        <div>
          <OrdineItem
            portate={item.portate}
            totale={item.totale}
            tavolo={item.tavolo}
            data={item.data}
            stato={item.stato}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleConsegnaOrdine(item)}
          >
            Consegna ordine
          </Button>
        </div>
      ))}
    </div>
  );
}

export default ViewControlloOrdini;
