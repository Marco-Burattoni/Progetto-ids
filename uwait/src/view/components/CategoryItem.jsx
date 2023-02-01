import React from 'react'
//nome categoria
//elenco pietanze
import MenuItem from './MenuItem'
function CategoryItem({nomeCategoria, portate}) {
  return (
    <div>
        <p>{nomeCategoria}</p>
        {portate.map(portata => (
          <MenuItem 
            nome={portata.nome} 
            descrizione={portata.descrizione} 
            prezzo={portata.prezzo} 
            allergeni={portata.allergeni}
          />
        ))}
    </div>
  )
}

export default CategoryItem