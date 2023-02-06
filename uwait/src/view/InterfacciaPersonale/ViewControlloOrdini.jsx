import React, { useContext } from "react";
import OrdineItem from "../components/OrdineItem";
import { GestionePersonaleController } from "../../controller/personale.controller";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";

function ViewControlloOrdini({ ordini }) {
  const { ordine, setOrdine, tavolo, setTavolo, personale, attivita } =
    useContext(AppContext);
  const navigate = useNavigate();

  const handleConsegnaOrdine = (ordine) => {
    const controller = new GestionePersonaleController(personale, attivita);
    controller.setConsegnato(ordine);
  };

  //per servire un tavolo accedo al menu
  const handleServiTavolo = () => {
    navigate("../menu");
  };

  return (
    <div>
      ViewControlloOrdini
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
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleServiTavolo(0)}
      >
        Servi un tavolo
      </Button>
    </div>
  );
}

export default ViewControlloOrdini;
