import React, { useState } from 'react'
import { Button, Card, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function ResultBuscador({Menus}) {



  return (
    <div className='cards'>
    
      
      {Menus.map(menu => <div className='cards' key={menu.id}>
      
             <Card style={{ width: '18rem' }}>
               <Card.Img variant="top" src={menu.image}  alt={menu.title} />
               <Card.Body>
                 <Card.Title>Platillo: {menu.title}</Card.Title>
                 <Card.Text>
                   <div>
                   Precio: {menu.pricePerServing}
                 Valor Nutricional {menu.healthScore} 
                 </div>
                 <div>
                 {menu.vegan? <div>Plato vegano: si</div>
                 : <div>Plato vegano: No</div> }
                 </div>
                 </Card.Text>
               </Card.Body>
               <Card.Footer>
               <Link to={`/detalle/${menu.id}`}> <Button variant="primary">Ver detalle</Button></Link>
               </Card.Footer>
             </Card>
             </div>
             
             )}
        
    </div>
  )
}

export default ResultBuscador