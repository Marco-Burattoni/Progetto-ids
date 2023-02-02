import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    root: {
      border: '1px solid gray',
      padding: '10px',
      marginBottom: '10px'
    }
  })
  
// Ordine 
// composto da: 
// Timestamp 
// Voci del menù 
// selezionate 
// Tavolo 
// Prezzo totale 
function OrdineItem({portate, totale, tavolo, data, stato}) {
    const classes = useStyles()

    return (
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <Typography >{portate.join(', ')}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography >{totale}€</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography >{tavolo}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography >{data}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography >{stato}</Typography>
          </Grid>
        </Grid>
      )
}

export default OrdineItem