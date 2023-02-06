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

function MenuItem({ nome, descrizione, prezzo, allergeni }) {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Typography variant="h4">{nome}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>{descrizione}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>Prezzo: {prezzo}€</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>Allergeni: {allergeni.join(", ")}</Typography>
      </Grid>
    </Grid>
  );
}

export default MenuItem;
