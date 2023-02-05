import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import ViewPagamentoOrdine from './ViewPagamentoOrdine';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('YOUR_PUBLISHABLE_KEY');

function StripeWrapper({ordine}) {
  return (
    <Elements stripe={stripePromise}>
      <ViewPagamentoOrdine ordine={ordine} />
    </Elements>
  );
}

export default StripeWrapper;
