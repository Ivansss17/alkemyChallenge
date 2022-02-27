import React from 'react';
import './App.css';

import FoodApi from './componentes/menuContainer/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormUser from './componentes/formulario/formUser';
import { BrowserRouter, Link, Navigate, Route, Routes, useNavigate  } from 'react-router-dom';
import Menu from './componentes/menu/menu';


function App() {
  
  
  return (
        
    <React.Fragment>
     
     <FormUser/>
    
  </React.Fragment>  
  );
}

export default App;
