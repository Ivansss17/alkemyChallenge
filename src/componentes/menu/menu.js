import React, { useState , useEffect} from 'react'
import { Button, Container, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import FoodApi from '../menuContainer/api';

import Detalle from '../otros/detalle';
import { CartContextProvider, useCartContext } from '../cardContext/CardContext';
import ResultBuscador from '../buscador/resultBuscador';
import Buscador from '../buscador/buscador';


function Menu({props}) {
   
     const [prop, setprop] = useState({
        mostrar : true
    })
   useEffect(() => {
    setprop ({
        mostrar:props.usuarioOk
    })
  
   }, [])
   
    const logout = ()=>{
      localStorage.removeItem('token')
      window.location.reload(true)
    } 
     
    
    
    
  return (
    <CartContextProvider>
    <BrowserRouter>
    <div className='divMenu'>
            
            <Navbar bg="dark" variant="dark" sticky="top">
               <Container>
               <Navbar.Brand href="#home">E-commerce</Navbar.Brand>
               <Nav className="me-auto">
                 <Nav.Link href="/">Home</Nav.Link>               
                 <Nav.Link href="/ResumenMenu">Ver platos seleccionados</Nav.Link>
                 
               </Nav>
               
        
              <Button variant="primary" size="sm" onClick={logout}>Logout</Button>
              
               </Container>
            </Navbar>
            <div className='cards'>
            <Buscador/>
            </div>
            </div> 
           
    <Routes>
    
     <Route path='/' exact element={<FoodApi />}/>
     <Route path='/detalle/:id' exact element={<Detalle/>}/>
     
     <Route path='/Buscador' exact element={<ResultBuscador/>}/>
     
     
    
  </Routes>
  </BrowserRouter>
 </CartContextProvider>
 
  )
}

export default Menu