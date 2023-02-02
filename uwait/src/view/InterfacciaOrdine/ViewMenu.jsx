import React from "react";
import MenuItem from "../components/MenuItem";

function ViewMenu() {
  const menu = [
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
  ];

  return (
    <div>
      {menu.map((item) => (
        <MenuItem
          key={item.nome}
          nome={item.nome}
          descrizione={item.descrizione}
          prezzo={item.prezzo}
          allergeni={item.allergeni}
        />
      ))}
    </div>
  );
}

export default ViewMenu;
