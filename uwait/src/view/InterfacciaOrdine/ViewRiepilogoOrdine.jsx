import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import { Box, Typography, Button } from "@material-ui/core";
import { AppContext } from "../../App";
import { GestioneOrdineController } from "../../controller/ordine.controller";

function ViewRiepilogoOrdine() {
  const navigate = useNavigate();
  const { ordine, setOrdine, tavolo } = useContext(AppContext);

  const onConfermaOrdine = async () => {
    const conferma = window.confirm("Sei sicuro di voler confermare l'ordine?");
    if (conferma) {
      const controller = new GestioneOrdineController(tavolo, ordine);
      localStorage.removeItem("ordine");
      await controller.conferma();
      setOrdine(null);
      navigate("../menu");
    }
  };

  const onAnnullaOrdine = () => {
    navigate("../menu");
  };

  if (ordine) {
    return (
      <Box>
        <Typography variant="h6">RIEPILOGO</Typography>
        {Array.from(ordine.portate.entries()).map((portata) => (
          <CartItem
            nomePortata={portata[0].nome}
            prezzo={portata[0].prezzo}
            quantita={portata[1]}
            key={portata[0].id}
          />
        ))}
        <Typography>Totale: {ordine.totale}€</Typography>
        <Typography>Tavolo: {tavolo}</Typography>
        <Typography>Data: {ordine.dataOra.toString()}</Typography>
        <Button variant="contained" color="primary" onClick={onConfermaOrdine}>
          Conferma ordine
        </Button>
        <Button variant="contained" color="secondary" onClick={onAnnullaOrdine}>
          Annulla ordine
        </Button>
      </Box>
    );
  } else {
    return <div>Non hai ancora ordinato</div>;
  }
}

export default ViewRiepilogoOrdine;
