import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./view/InterfacciaLogin/ViewLogin";
import SignUp from "./view/InterfacciaLogin/ViewSignUp";
import ViewMenu from "./view/InterfacciaOrdine/ViewMenu";
import ViewRiepilogoOrdine from "./view/InterfacciaOrdine/ViewRiepilogoOrdine";

let state = {
  isSignedIn: false,
  gestore: null,
  personale: null,
  ordine: null,
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/menu",
    element: <ViewMenu />,
  },
  {
    path: "/riepilogo",
    element: <ViewRiepilogoOrdine ordine={state.ordine} />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
