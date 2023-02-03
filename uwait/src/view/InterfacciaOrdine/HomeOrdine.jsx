import React, { useState } from "react";
import { Button, List, ListItem, ListItemText, Typography } from "@material-ui/core";

function HomeOrdine() {
  const [cart, setCart] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirmOrder = () => {
    // logic to confirm the order
  };

  const handleBackToCart = () => {
    setShowConfirm(false);
  };

  return (
    <div>
      {showConfirm ? (
        <>
          <Typography variant="h4">Riepilogo ordine</Typography>
          <List>
            {cart.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item.name} secondary={item.price} />
              </ListItem>
            ))}
          </List>
          <Button variant="contained" color="primary" onClick={handleConfirmOrder}>
            Conferma ordine
          </Button>
          <Button variant="contained" onClick={handleBackToCart}>
            Torna al carrello
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h4">Carrello</Typography>
          <List>
            {cart.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item.name} secondary={item.price} />
              </ListItem>
            ))}
          </List>
          <Button variant="contained" color="primary" onClick={() => setShowConfirm(true)}>
            Conferma ordine
          </Button>
        </>
      )}
    </div>
  );
}

export default HomeOrdine;