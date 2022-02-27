import axios from 'axios';
import React from 'react';
import  { useState, useEffect } from 'react';
import { Button, Form, Modal, Nav, Spinner } from 'react-bootstrap';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import ModalEjemplo from './modal/modal'
import Menu from '../menu/menu';
import { Formik, validateYupSchema, yupToFormErrors } from 'formik';
import * as Yup from 'yup';



 function FormUser() { 
 
  
//validacion


  


const claveToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJjaGFsbGVuZ2VAYWxrZW15Lm9yZyIsImlhdCI6MTUxNjIzOTAyMn0.ilhFPrG0y7olRHifbjvcMOlH7q2YwlegT0f4aSbryBE'

console.log(localStorage.getItem('token'))

const [userok, setUserok] = useState({
  usuarioOk : true,
})

const [msj, setMsj] = useState({msjUser: 'Inicio de sesion incorrecto'})
const [show, setShow] = useState(false);
  
    const handleClose = () => {setShow(false)
    window.location.reload(true)  
    }
    const handleShow = () =>setShow(true)
          
  



const [error, setError] = useState({
  error:true,
  errormsg:''
})






const tokenApi  = async (values) =>{
    let url = 'http://challenge-react.alkemy.org/'
    
    axios.post(url,values)
    .then (response =>{ 
      console.log(response.statusText)
         if (response.statusText === 'OK'){
          localStorage.setItem('token',response.data.token)
          setMsj ({msjUser: 'ingreso correcto'})
        }
         
    })
    .catch(err =>  setError ({
      error: false,
      errormsg: 'error al introducir email/password'
    } ))
    
  }
  useEffect(() => {
    let  tokenresp = localStorage.getItem('token')
    if (tokenresp === claveToken){
      setUserok ({usuarioOk: false})
     
    }
    console.log('renderiza')
    
  }, [])

  const SignupSchema = Yup.object().shape({
    email: Yup.string().min(2, 'Too Short!').email('Invalid email').required('Required'),
    
  })
  

    return (
    <React.Fragment>
      <div className='divForm'>
  {userok.usuarioOk?
  <Formik initialValues={{
    email : '',
    password : ''
  }}
   validate={(valores )=>{
     let errores = {}
     console.log(valores)
     
     if(!valores.email){
       console.log('no hay nada')
       errores.email = 'por favor ingrese un correo'
       errores.password = 'por favor ingrese su contraseña'
       
     }
     if(!valores.password){
       console.log('no hay nada')
       errores.password = 'por favor ingrese su contraseña'
       
     }
     return errores
   }}
   validationSchema = {SignupSchema}
   onSubmit={(valores)=>{
     tokenApi(valores)
     console.log('enviado')
     console.log(valores)

   }

   }>
    {({ values ,handleBlur, errors, touched, handleSubmit, handleChange})=>(
  <Form onSubmit={handleSubmit} className="formUser">
   <fieldset className='fieldset' > 
    <Form.Group className="mb-3">
      <Form.Label >Ingrese su email</Form.Label>
      <Form.Control  name="email" 
                     type="email" 
                     placeholder='ingrese su email'
                     onChange={handleChange}
                     value={values.email}
                     onBlur={handleBlur}/>
                     {touched.email && errors.email && <div>{errors.email}</div>}
                    
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label ></Form.Label>
      <Form.Control  
                    type="password" 
                    name="password"
                    placeholder="ingrese su contraseña" 
                    onChange={handleChange}
                    value={values.password}
                    onBlur={handleBlur}/>
                    {touched.password && errors.password && <div>{errors.password}</div>}
    </Form.Group>
   
    {error.error?
    <div>introducir usuario y contraseña</div>
    :
    <div className='alert alert-danger' role='alert'>{error.errormsg}</div>
    }
    <Button variant="primary" type="submit" onClick={handleShow}>Ingresar</Button>
    <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Inicio de Secion</Modal.Title>
          </Modal.Header>
          <Modal.Body>{msj.msjUser}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Continuar
            </Button>
          </Modal.Footer>
        </Modal>
  </fieldset> 
</Form>
)}
</Formik>
:

  
  <Menu props={userok}/>

 }</div>
  </React.Fragment>
        
                    
  )
}

export default FormUser;
