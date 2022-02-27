import React from 'react';
import './App.css';


import 'bootstrap/dist/css/bootstrap.min.css';
import FormUser from './componentes/formulario/formUser';
import { BrowserRouter, Link, Navigate, Route, Routes, useNavigate  } from 'react-router-dom';



function App() {
  
  
  return (
        
    <React.Fragment>
     
     <FormUser/>
    
  </React.Fragment>  
  );
}

export default App;
