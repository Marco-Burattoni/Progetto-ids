import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    border: '1px solid gray',
    padding: '10px',
    marginBottom: '10px'
  }
})

//ci vuole anche la quantità?
function CartItem({nomePortata, prezzo}) {
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Typography>{nomePortata} {prezzo}€</Typography>
      </Grid>
    </Grid>
  )
}

export default CartItem