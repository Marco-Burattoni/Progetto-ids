import React, { useState, useContext } from "react";
import { AppContext } from "../../App";
import { useEffect } from "react";
import MenuItem from "../components/MenuItem";
import { useLoaderData } from "react-router-dom";
import { fetchMenus, createOrder } from "../../firebase/firebase.utils";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@mui/material";

function ViewMenu() {
  const loaderData = useLoaderData();
  const { attivitaId } = loaderData;
  const { tavolo, setTavolo, ordine, setOrdine } = useContext(AppContext);

  let [menus, setMenus] = useState();

  useEffect(() => {
    if (!ordine && tavolo > 0) {
      setOrdine(createOrder(attivitaId, tavolo));
    }
  }, [attivitaId, ordine, tavolo]);

  useEffect(() => {
    async function fetchdata() {
      const menus = await fetchMenus(attivitaId);
      setMenus(menus);
    }

    fetchdata();
  }, [attivitaId]);

  const menu = menus ? menus[0] : null;

  return (
    <div>
      {menu ? (
        <>
          <Typography variant="h2">{menu.nome}</Typography>
          <Typography variant="body1">Tavolo: </Typography>
          <TextField
            type="number"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            value={tavolo}
            onChange={(e) => setTavolo(parseInt(e.target.value))}
          />
          {menu.portate.map((item) => (
            <MenuItem
              key={item.nome}
              nome={item.nome}
              descrizione={item.descrizione}
              prezzo={item.prezzo}
              allergeni={item.allergeni}
            />
          ))}
        </>
      ) : (
        <>Impossibile trovare l'attività che cerchi</>
      )}
    </div>
  );
}

export default ViewMenu;
