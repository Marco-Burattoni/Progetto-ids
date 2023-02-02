import React, { useState } from "react";
import { useEffect } from "react";
import MenuItem from "../components/MenuItem";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import { Attivita } from "../../model/attivita.model";
import { fetchMenus } from "../../firebase/firebase.utils";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function ViewMenu() {
  let query = useQuery();
  let [menus, setMenus] = useState([]);

  useEffect(() => {
    const attivitaId = query.get("attivita");
    setMenus(fetchMenus(attivitaId));
  }, [query]);

  /*const menu = [
    {
      nome: "Pizza Margherita",
      descrizione: "Pomodoro, mozzarella, basilico",
      prezzo: 8,
      allergeni: ["glutine"],
    },
    {
      nome: "Pasta al pomodoro",
      descrizione: "Pasta con salsa di pomodoro fresco",
      prezzo: 7,
      allergeni: [],
    },
    {
      nome: "Insalata caprese",
      descrizione: "Mozzarella, pomodori, basilico, olio extravergine d'oliva",
      prezzo: 6,
      allergeni: [],
    },
  ];*/

  return (
    <div>
      {menus.map((menu) => [
        menu.map((item) => (
          <MenuItem
            key={item.nome}
            nome={item.nome}
            descrizione={item.descrizione}
            prezzo={item.prezzo}
            allergeni={item.allergeni}
          />
        )),
      ])}
    </div>
  );
}

export default ViewMenu;
