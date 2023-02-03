import React, { useState } from 'react';
import { Grid, Typography, Paper, Button, TextField } from '@material-ui/core';

function HomeGestioneCliente() {
  const [numeroTavolo, setNumeroTavolo] = useState('');

  function handleNumeroTavoloChange(event) {
    setNumeroTavolo(event.target.value);
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6">Inserisci il numero del tavolo</Typography>
        <TextField
          label="Numero Tavolo"
          value={numeroTavolo}
          onChange={handleNumeroTavoloChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary">Visualizza Menù</Button>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="secondary">Richiama Personale</Button>
      </Grid>
    </Grid>
  );
}

export default HomeGestioneCliente;