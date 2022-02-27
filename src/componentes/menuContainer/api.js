import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { Button, Card, CardGroup, CardImg, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { objetoListo } from '../algo'
import { objeto } from '../algo'
import Buscador from '../buscador/buscador'
function FoodApi() {
    const [Menus, setMenus] = useState([])
    const [Nutrition, setNutrition] = useState([])
    const [Nutrients, setNutrients] = useState({})
    const [loading, setLoading] = useState(true)

  
    /* useEffect(()=>{
      //fetch('https://api.spoonacular.com/recipes/424571/information?apiKey=10bce90bf3314da6a5d9d068e7b3fab3&includeNutrition=true')
      fetch('https://api.spoonacular.com/recipes/complexSearch?query=pasta&maxFat=25&number=20&apiKey=10bce90bf3314da6a5d9d068e7b3fab3&includeNutrition=true')
      //.then (resp =>console.log(resp.json()) )
      .then (resp => resp.json())
      .then ((json) => {
      console.log(json.results)
     setMenus(json.results)
     //setNutrition(Menus.nutrition)
     //setNutrients(Menus.nutrition.nutrients)
    
     })
     .catch((err) =>{
      console.log(err)})
     .finally(()=>setLoading(false))
     
     
     
    },3000)  */

   /*  const tokenApi  = async () =>{
      let url = 'http://challenge-react.alkemy.org/'
      const response = await axios.post(url,{email:'challenge@alkemy.org',password:'react'})
      console.log(response)
    } */
    
    const llamadaApi =async () =>{
     try {
      //  const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch?query=pasta&maxFat=25&number=20&apiKey=10bce90bf3314da6a5d9d068e7b3fab3&includeNutrition=true');
       const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=10bce90bf3314da6a5d9d068e7b3fab3&includeNutrition=true&priceBreakdownWidget.json&number=20&random&instructionsRequired=true&addRecipeInformation=true');
          console.log(response)
          const comidas = await response.data.results
        //const instructionsRequired = await response.data.results.
        setMenus(comidas)
        console.log(comidas)
        
        setLoading(false)

        
      
        //setNutrition(comidas.analyzedInstructions[0])
        /* for (let comida in comidasa[0]){
          console.log(comida)
          console.log(comidas[comida])
        } */

     } catch (error) {
      console.error(error);
     }
   }
   useEffect(()=>{
      llamadaApi()
      
      
    }, [])
  
    
  

    
 //   function llamadaApi(){
 //   const apiobjeto = objeto.results
 //   setMenus (apiobjeto)
 //   console.log(apiobjeto)
 //   setLoading(false)
 // }
    //setMenus(apiobjeto)
    //console.log(Menus)
    //apiobjeto.map (prop => {let prop1 = prop.nutrition.nutrients[0]
    //console.log(prop1)
    //})
    //console.log(apiobjeto.nutrition)
    //const objeto1 = apiobjeto[0]
    //const propiedades = apiobjeto1.filter(prop => prop.id === prop.id)
    //console.log(propiedades)
    //console.log(objeto1.id)
    //const objNutri = {}
    //for (let api of apiobjeto){
    //  //console.log(api.nutrition.nutrients[0])
    //  let propN = api.nutrition.nutrients[0]
    //  console.log(propN)
      //agregar(propN)
     //let propN1 = [...propN]
      //console.log(propN)
      //setNutrition(new Nutrients1 (api.nutrition.nutrients[0]))
       //objNutri += api.nutrition.nutrients[0]
      //const objNutri1 = [...objNutri]
      //console.log(objNutri)
    //}
    //function agregar (propN) {
    //  setNutrition(propN)
    //}
    //console.log(objNutri)
    //console.log(Nutrition)
    

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
                              
                 </div>

                              
                               
                                }
                 
                               
                                 
                               
        </div>
    ) 
 }

export default FoodApi


/* {`${heroe.thumbnail.path}.${heroe.thumbnail.extension}`} */

