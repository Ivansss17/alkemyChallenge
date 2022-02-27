import axios from 'axios';
import { Formik } from 'formik'
import React, { useState } from 'react'
import { Button, Form, FormControl, Nav } from 'react-bootstrap';
import * as Yup from 'yup';
import ResultBuscador from './resultBuscador';

function Buscador() {


  
  
   
    const [Menus, setMenus] = useState([])

    const busquedaApi =async (search) =>{
      console.log(search, 'que trae search')
        try {
         const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch?query='+search+'&apiKey=10bce90bf3314da6a5d9d068e7b3fab3&includeNutrition=true&priceBreakdownWidget.json&number=5&instructionsRequired=true&addRecipeInformation=true');
         
             console.log(response)
             const comidas = await response.data.results
           setMenus(comidas)
           console.log(comidas)
           
         
           
           
         
        
   
        } catch (error) {
         console.error(error);
        }
      }
    


    const SignupSchema = Yup.object().shape({
        search: Yup.string().min(2, 'Debe tener 2 carcters minimo!')
      })

  return (
    <div >
        <Formik
                             initialValues={{
                                search:''
                             }}
                              
                              validationSchema = {SignupSchema}
                              onSubmit={(valores)=>{
                               busquedaApi(valores.search)
                                console.log('enviado')
                                console.log(valores.search)

                              }}

                              
                              >
                                {({ values ,handleBlur, errors, touched, handleSubmit, handleChange})=>(
        <Form className="d-flex" onSubmit={handleSubmit}>
    <FormControl
      name="search"
      type="text"
      placeholder="Search"
      className="me-2"
      aria-label="Search"
      onChange={handleChange}
      value={values.search}
      onBlur={handleBlur}
    />{touched.search && errors.search && <div>{errors.search}</div>}
   
    <Button type='submit'variant="outline-secondary" >Search</Button>
  
     </Form>
                                )}
                                </Formik>
          <ResultBuscador Menus={Menus}/>
    </div>
  )
}

export default Buscador
