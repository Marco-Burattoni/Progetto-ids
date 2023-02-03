import React, { useState } from 'react';
import { Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
import { Grid, Typography, Paper, Button } from '@material-ui/core';

const stripePromise = loadStripe('YOUR_PUBLISHABLE_KEY');

function ViewPagamentoOrdine({ ordine }) {
  const [pagamenti, setPagamenti] = useState([]);
  const [errore, setErrore] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  async function handleSubmit(event) {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(PaymentElement),
    });

    if (error) {
      setErrore(error.message);
      console.log(error.message);
      return;
    } else {
      //salvo i dati
      const pagamento = {
        ordine: ordine,
        nomeTitolare: paymentMethod.card.name,
        numeroCarta: paymentMethod.card.last4,
        scadenza: `${paymentMethod.card.exp_month}/${paymentMethod.card.exp_year}`,
      };

      setPagamenti([...pagamenti, pagamento]);
    }
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5">{`Tavolo: ${ordine.tavolo}`}</Typography>
        <Paper>
          <Typography variant="h6">{`Il tuo ordine: ${ordine.portate.join(', ')}`}</Typography>
          <Typography>{`Totale: ${ordine.totale}`}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Form di pagamento</Typography>
        <Elements stripe={stripePromise}>
          <PaymentElement />
        </Elements>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Conferma il pagamento
        </Button>
      </Grid>
    </Grid>
  );
}

export default ViewPagamentoOrdine;