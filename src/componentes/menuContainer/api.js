import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { Button, Card, CardGroup, CardImg, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function FoodApi() {
    const [Menus, setMenus] = useState([])
    
    const [loading, setLoading] = useState(true)

  
    
    
    const llamadaApi =async () =>{
     try {
       const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=10bce90bf3314da6a5d9d068e7b3fab3&includeNutrition=true&priceBreakdownWidget.json&number=20&random&instructionsRequired=true&addRecipeInformation=true');
         
          const comidas = await response.data.results
       
        setMenus(comidas)
        
        setLoading(false)

        
      
 

     } catch (error) {
      console.error(error);
     }
   }
   useEffect(()=>{
      llamadaApi()
      
      
    }, [])
  
      
 

     return (
        <div className='Columnas'>
          <h2 className='tituloApi'> Bienvenidos a la selecion de munus</h2>
          <h5 className='tituloApi'> Recuerde que debe selecionar 4 menus y por lo menos dos deben ser Veganos</h5>

           
  
            {
            loading? <div><Spinner animation="grow" size="sm" />
            <Spinner animation="grow" /></div> :
            
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
              
              
                 </div>    )}            
                              
                 </div>}
                  
        </div>
    ) 
 }

export default FoodApi



