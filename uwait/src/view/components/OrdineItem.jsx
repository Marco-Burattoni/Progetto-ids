import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    border: "1px solid gray",
    padding: "10px",
    marginBottom: "10px",
  },
});

// Ordine
// composto da:
// Timestamp
// Voci del menù
// selezionate
// Tavolo
// Prezzo totale
function OrdineItem({ ordine }) {
  const portate = ordine.portate;
  const totale = ordine.totale;
  const tavolo = ordine.tavolo;
  const data = ordine.dataOra;
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Typography>Portate:</Typography>
        {Array.from(portate.entries()).map((portata) => (
          <Typography>{portata[1] + " x " + portata[0].nome}</Typography>
        ))}
      </Grid>
      <Grid item xs={12}>
        <Typography>Totale: {totale}€</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>Tavolo: {tavolo}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>{data.toDate().toString()}</Typography>
      </Grid>
    </Grid>
  );
}

export default OrdineItem;
