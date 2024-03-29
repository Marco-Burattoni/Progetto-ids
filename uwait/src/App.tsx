import { useState, createContext } from "react";
import {
  createBrowserRouter,
  LoaderFunctionArgs,
  RouterProvider,
} from "react-router-dom";
import SignIn from "./view/InterfacciaLogin/ViewLogin";
import SignUp from "./view/InterfacciaLogin/ViewSignUp";
import ViewMenu from "./view/InterfacciaOrdine/ViewMenu";
import ViewRiepilogoOrdine from "./view/InterfacciaOrdine/ViewRiepilogoOrdine";
import StripeWrapper from "./view/InterfacciaCliente/StripeWrapper";
import ViewControlloOrdini from "./view/InterfacciaPersonale/ViewControlloOrdini";

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
  const [tavolo, setTavolo] = useState(localStorage.getItem("tavolo") ?? 0);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ViewControlloOrdini />,
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
          element: <ViewRiepilogoOrdine />,
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
