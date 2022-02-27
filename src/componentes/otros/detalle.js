import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useCartContext } from '../cardContext/CardContext'


function Detalle() {

  const [Menus, setMenus] = useState([])
 
  const [count, setCount] = useState(1)
  const {id} = useParams()

  const {agregarAlMenu, cantidadItems,eliminarItem, sumaTotal,promedioHealtScore} = useCartContext()

  const onAdd= (count) =>{
    
    agregarAlMenu({...Menus, cantidad: count})
    cantidadItems()
    
  
  }
  

   const llamadaApi =async () =>{
     try {  
        const response = await axios.get('https://api.spoonacular.com/recipes/'+id+'/information?includeNutrition=false&apiKey=10bce90bf3314da6a5d9d068e7b3fab3&includeNutrition=true&instructionsRequired=true&addRecipeInformation=true&priceBreakdownWidget.json');
          console.log(response)
          const comidas = await response.data
          
          setMenus(comidas)
          console.log(comidas)
 

      } catch (error) {
        console.error(error);
      }
    }
   useEffect(()=>{
    llamadaApi()
   
    
  }, [])
  return (
    <> 
      <br></br>
      <br></br>
      <div className='cards' >
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={Menus.image}  alt={Menus.title} />
      <Card.Body>
        <Card.Title>Platillo: {Menus.title}</Card.Title>
        <Card.Text>
         Precio: $ {Menus.pricePerServing} 
        
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Detalle del menu: {`Puntaje de salud: ${Menus.healthScore} Tiempo de preparacion: ${Menus.readyInMinutes}`} </small>
       <Button onClick={()=>onAdd(count)}>Agregar a Menu</Button>
       <Button onClick={()=>eliminarItem(Menus.id)}>Eliminar Item del menu</Button>
       <Link to='/'><Button >Ir a seleccion de platos </Button></Link>
      
      
      </Card.Footer>
    </Card>
    
    
       </div>
       <div className='cards' >
    <Card style={{ width: '18rem' }}>
     
      <Card.Body>
        <Card.Title>Resumen menu seleccionado</Card.Title>
        <Card.Text>
        Promedio Nutricional: {promedioHealtScore()}  
          Precio total: ${sumaTotal()} 
          Cantidad de platos seleccionados: {cantidadItems()}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
       
      
      
      
      </Card.Footer>
    </Card>
    
    
       </div>                         
       </>
  )
}

export default Detalle