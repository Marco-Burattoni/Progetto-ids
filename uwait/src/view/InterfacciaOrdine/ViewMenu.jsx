import React, { useState, useContext, useMemo, useReducer } from "react";
import { AppContext } from "../../App";
import MenuItem from "../components/MenuItem";
import { useLoaderData } from "react-router-dom";
import {
  fetchMenus,
  createOrder,
  fetchOrder,
} from "../../firebase/firebase.utils";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import { Button, Grid } from "@material-ui/core";
import { GestioneOrdineController } from "../../controller/ordine.controller";
import { FormLabel } from "@mui/material";
import { useEffect } from "react";

const ViewMenu = () => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const loaderData = useLoaderData();
  const { ordine, setOrdine, tavolo, setTavolo } = useContext(AppContext);

  // const [] = useState(0);
  const [attivitaId] = useState(loaderData.attivitaId);
  let [menus, setMenus] = useState();

  const saveOrdine = () => {
    if (ordine) localStorage.setItem("ordine", ordine.id);
  };

  useEffect(() => {
    if (localStorage.getItem("ordine") === null && !ordine && tavolo > 0) {
      (async function () {
        let order = await createOrder(attivitaId, tavolo);
        console.log(order);
        saveOrdine(order);
        setOrdine(order);
      })();
    }
  }, [attivitaId, ordine, setOrdine, tavolo]);

  useMemo(() => {
    async function fetchData() {
      const menus = await fetchMenus(attivitaId);
      setMenus(menus);
    }
    fetchData();
  }, [attivitaId]);

  useMemo(() => {
    if (!ordine && menus && localStorage.getItem("ordine"))
      (async function () {
        const order = await fetchOrder(
          menus[0],
          localStorage.getItem("ordine")
        );
        setOrdine(order);
      })();
  }, [menus]);

  const menu = menus ? menus[0] : null;

  const handleDecrementQuantity = (item) => {
    let quantita = ordine.getQuantita(item) || 1;
    const controller = new GestioneOrdineController(tavolo, ordine);
    controller.modifica(item, quantita - 1);
    setOrdine(controller.ordine);
    saveOrdine();
    forceUpdate();
  };

  const handleIncrementQuantity = (item) => {
    let quantita = ordine.getQuantita(item) || 0;
    const controller = new GestioneOrdineController(tavolo, ordine);
    controller.modifica(item, quantita + 1);
    setOrdine(controller.ordine);
    saveOrdine();
    forceUpdate();
  };

  return (
    <div>
      {menu ? (
        <>
          <Typography variant="h2">{menu.nome}</Typography>
          {/*<Typography variant="body1">Tavolo: </Typography>*/}
          <FormLabel htmlFor="tavolo">Tavolo: </FormLabel>
          <TextField
            name="tavolo"
            type="number"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]" }}
            defaultValue={tavolo}
            onBlur={(e) => {
              let val = parseInt(e.target.value);
              setTavolo(val);
              localStorage.setItem("tavolo", val);
            }}
          />
          {menu.portate.map((item) => (
            <Grid
              container
              spacing={2}
              key={item.nome}
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={8}>
                <MenuItem
                  nome={item.nome}
                  descrizione={item.descrizione}
                  prezzo={item.prezzo}
                  allergeni={item.allergeni}
                />
              </Grid>
              <Grid item>
                <Grid container direction="row" spacing={1}>
                  <Grid item>
                    <Button onClick={() => handleDecrementQuantity(item)}>
                      -
                    </Button>
                  </Grid>
                  <Grid item>
                    <TextField
                      inputProps={{
                        inputMode: "numeric",
                        pattern: "[0-9]",
                      }}
                      value={ordine?.getQuantita(item) || 0}
                      disabled={tavolo <= 0}
                    />
                  </Grid>

                  {/* <Button
                      onClick={() =>
                        handleAddToOrder(item, ordine?.getQuantita(item) || 0)
                      }
                    >
                      <ShoppingCartIcon />
                    </Button> */}
                  <Grid item>
                    <Button onClick={() => handleIncrementQuantity(item)}>
                      +
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}

          <Button
            onClick={async () => {
              let ordineController = new GestioneOrdineController(
                tavolo,
                ordine
              );
              ordineController.conferma();
            }}
          >
            Conferma Ordine
          </Button>
        </>
      ) : (
        <>Impossibile trovare l'attività che cerchi</>
      )}
    </div>
  );
};

export default ViewMenu;
