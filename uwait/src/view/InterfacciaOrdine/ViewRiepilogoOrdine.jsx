import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import { Box, Typography, Button } from "@material-ui/core";
import { AppContext } from "../../App";
import { GestioneOrdineController } from "../../controller/ordine.controller";

function ViewRiepilogoOrdine({ ordine }) {

  const navigate = useNavigate();
  const tavolo = useContext(AppContext);
  
  const onConfermaOrdine = () => {
    const conferma = window.confirm("Sei sicuro di voler confermare l'ordine?");
    if (conferma) {
      const controller = new GestioneOrdineController(tavolo, ordine);
      controller.conferma(ordine)
    }
  };

  const onAnnullaOrdine = () => {
    navigate("../menu");
  };

  if (ordine) {
    const { cartItems, totale, tavolo, data } = ordine;

    return (
      <Box>
        <Typography variant="h6">RIEPILOGO</Typography>
        {cartItems.map((cartItem) => (
          <CartItem
            nomePortata={cartItem.nomePortata}
            prezzo={cartItem.prezzo}
          />
        ))}
        <Typography>Totale: {totale}</Typography>
        <Typography>Tavolo: {tavolo}</Typography>
        <Typography>Data: {data}</Typography>
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
