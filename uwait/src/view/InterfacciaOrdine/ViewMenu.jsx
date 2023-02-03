import React, { useState } from "react";
import { useEffect } from "react";
import MenuItem from "../components/MenuItem";
import { useLoaderData } from "react-router-dom";
import { fetchMenus } from "../../firebase/firebase.utils";
import Typography from "@material-ui/core/Typography";
import { Ordine } from "../../model/ordine.model";

function ViewMenu({ ordine }) {
  const loaderData = useLoaderData();
  const { attivitaId } = loaderData;

  let [menus, setMenus] = useState();

  if (!ordine) {
    ordine = new Ordine();
  }

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
