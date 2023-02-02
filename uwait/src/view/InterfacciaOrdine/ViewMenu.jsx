import React, { useState } from "react";
import { useEffect } from "react";
import MenuItem from "../components/MenuItem";
import { useLocation } from "react-router-dom";
import { fetchMenus } from "../../firebase/firebase.utils";
import Typography from "@material-ui/core/Typography";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function ViewMenu() {
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
