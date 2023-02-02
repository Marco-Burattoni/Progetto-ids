import React, { useState } from "react";
import { useEffect } from "react";
import MenuItem from "../components/MenuItem";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import { Attivita } from "../../model/attivita.model";
import { fetchMenus } from "../../firebase/firebase.utils";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    border: "1px solid gray",
    padding: "10px",
    marginBottom: "10px",
  },
});

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function ViewMenu() {
  const classes = useStyles();

  let query = useQuery();
  let [menus, setMenus] = useState();

  useEffect(() => {
    async function fetchdata() {
      const attivitaId = query.get("attivita");
      const menus = await fetchMenus(attivitaId);
      setMenus(menus);
    }

    fetchdata();
  }, [query]);

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
