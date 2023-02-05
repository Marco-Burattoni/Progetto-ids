import React, { useState, createContext } from "react";
import {
  createBrowserRouter,
  LoaderFunctionArgs,
  RouterProvider,
} from "react-router-dom";
import SignIn from "./view/InterfacciaLogin/ViewLogin";
import SignUp from "./view/InterfacciaLogin/ViewSignUp";
import ViewMenu from "./view/InterfacciaOrdine/ViewMenu";
import ViewRiepilogoOrdine from "./view/InterfacciaOrdine/ViewRiepilogoOrdine";
import ViewPagamentoOrdine from "./view/InterfacciaCliente/ViewPagamentoOrdine";
import StripeWrapper from "./view/InterfacciaCliente/StripeWrapper";

async function loader(args: LoaderFunctionArgs) {
  return args.params;
}

export const AppContext = createContext({});

export default function App() {
  const [isSignedIn, setSignedIn] = useState(false);
  const [gestore, setGestore] = useState(null);
  const [personale, setPersonale] = useState(null);
  const [ordine, setOrdine] = useState(null);
  const [pagamento, setPagamento] = useState(null);
  const [tavolo, setTavolo] = useState(0);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Home</div>,
    },
    {
      path: "signin",
      element: <SignIn />,
    },
    {
      path: "signup",
      element: <SignUp />,
    },
    {
      path: "/:attivitaId",
      loader: loader,
      children: [
        {
          path: "menu",
          element: <ViewMenu />,
          loader: loader,
        },
        {
          path: "riepilogo",
          element: <ViewRiepilogoOrdine ordine={ordine} />,
        },
        {
          path: "pagamento",
          element: <StripeWrapper ordine={ordine} />, // pagamento={pagamento} />,
        },
      ],
    },
  ]);

  return (
    <AppContext.Provider
      value={{
        isSignedIn,
        setSignedIn,
        gestore,
        setGestore,
        ordine,
        setOrdine,
        pagamento,
        setPagamento,
        personale,
        setPersonale,
        tavolo,
        setTavolo,
      }}
    >
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}
