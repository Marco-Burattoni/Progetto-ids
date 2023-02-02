import React from 'react'

const useStyles = makeStyles({
    root: {
      border: '1px solid gray',
      padding: '10px',
      marginBottom: '10px'
    }
  })
  
  //nome del piatto, quantità, prezzo (del singolo piatto oppure singolo*quantità selezionata??)
function OrdineItem({menuItem, quantita, prezzo}) {
    const classes = useStyles()

    return (
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <Typography variant="h3">{menuItem} x{quantita}     {prezzo}€</Typography>
          </Grid>
        </Grid>
      )
}

export default OrdineItem