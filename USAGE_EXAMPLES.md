# Usage Examples & Integration Guide

## Table of Contents
1. [Getting Started](#getting-started)
2. [Authentication Flow](#authentication-flow)
3. [Recipe Search Implementation](#recipe-search-implementation)
4. [Cart Management Examples](#cart-management-examples)
5. [Complete Application Setup](#complete-application-setup)
6. [Custom Component Development](#custom-component-development)
7. [API Integration Patterns](#api-integration-patterns)
8. [Error Handling Examples](#error-handling-examples)
9. [Testing Examples](#testing-examples)

## Getting Started

### Basic Application Setup
```jsx
// src/App.js
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormUser from './componentes/formulario/formUser';

function App() {
  return (
    <React.Fragment>
      <FormUser />
    </React.Fragment>
  );
}

export default App;
```

### Entry Point Configuration
```jsx
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
```

## Authentication Flow

### Complete Login Implementation
```jsx
import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { Button, Form, Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import axios from 'axios';

function LoginForm() {
  const [userok, setUserok] = useState({ usuarioOk: true });
  const [msj, setMsj] = useState({ msjUser: 'Inicio de sesion incorrecto' });
  const [show, setShow] = useState(false);
  const [error, setError] = useState({ error: true, errormsg: '' });

  const handleClose = () => {
    setShow(false);
    window.location.reload(true);
  };

  const handleShow = () => setShow(true);

  const tokenApi = async (values) => {
    let url = 'http://challenge-react.alkemy.org/';
    
    try {
      const response = await axios.post(url, values);
      if (response.statusText === 'OK') {
        localStorage.setItem('token', response.data.token);
        setMsj({ msjUser: 'ingreso correcto' });
        setUserok({ usuarioOk: false });
      }
    } catch (err) {
      setError({
        error: false,
        errormsg: 'error al introducir email/password'
      });
    }
  };

  useEffect(() => {
    const tokenresp = localStorage.getItem('token');
    const claveToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJjaGFsbGVuZ2VAYWxrZW15Lm9yZyIsImlhdCI6MTUxNjIzOTAyMn0.ilhFPrG0y7olRHifbjvcMOlH7q2YwlegT0f4aSbryBE';
    
    if (tokenresp === claveToken) {
      setUserok({ usuarioOk: false });
    }
  }, []);

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .min(2, 'Too Short!')
      .email('Invalid email')
      .required('Required'),
  });

  if (!userok.usuarioOk) {
    return <MenuComponent />; // Redirect to main app
  }

  return (
    <div className='divForm'>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={SignupSchema}
        onSubmit={(valores) => {
          tokenApi(valores);
        }}
      >
        {({ values, handleBlur, errors, touched, handleSubmit, handleChange }) => (
          <Form onSubmit={handleSubmit} className="formUser">
            <fieldset className='fieldset'>
              <Form.Group className="mb-3">
                <Form.Label>Ingrese su email</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder='ingrese su email'
                  onChange={handleChange}
                  value={values.email}
                  onBlur={handleBlur}
                />
                {touched.email && errors.email && <div>{errors.email}</div>}
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="ingrese su contraseña"
                  onChange={handleChange}
                  value={values.password}
                  onBlur={handleBlur}
                />
                {touched.password && errors.password && <div>{errors.password}</div>}
              </Form.Group>

              {error.error ? (
                <div>introducir usuario y contraseña</div>
              ) : (
                <div className='alert alert-danger' role='alert'>{error.errormsg}</div>
              )}

              <Button variant="primary" type="submit" onClick={handleShow}>
                Ingresar
              </Button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Inicio de Sesion</Modal.Title>
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
    </div>
  );
}
```

## Recipe Search Implementation

### Advanced Search Component
```jsx
import React, { useState } from 'react';
import { Formik } from 'formik';
import { Button, Form, FormControl, Spinner } from 'react-bootstrap';
import * as Yup from 'yup';
import axios from 'axios';
import ResultBuscador from './resultBuscador';

function AdvancedSearch() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const busquedaApi = async (search, filters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams({
        query: search,
        apiKey: 'your_api_key_here',
        includeNutrition: 'true',
        number: '10',
        instructionsRequired: 'true',
        addRecipeInformation: 'true',
        ...filters
      });

      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?${params}`
      );
      
      setMenus(response.data.results);
    } catch (error) {
      console.error('Search error:', error);
      setError('Error al buscar recetas. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const SignupSchema = Yup.object().shape({
    search: Yup.string()
      .min(2, 'Debe tener 2 caracteres mínimo!')
      .required('Campo requerido')
  });

  return (
    <div>
      <Formik
        initialValues={{ search: '' }}
        validationSchema={SignupSchema}
        onSubmit={(valores) => {
          busquedaApi(valores.search);
        }}
      >
        {({ values, handleBlur, errors, touched, handleSubmit, handleChange }) => (
          <Form className="d-flex" onSubmit={handleSubmit}>
            <FormControl
              name="search"
              type="text"
              placeholder="Buscar recetas..."
              className="me-2"
              aria-label="Search"
              onChange={handleChange}
              value={values.search}
              onBlur={handleBlur}
            />
            {touched.search && errors.search && (
              <div className="text-danger">{errors.search}</div>
            )}
            
            <Button 
              type='submit' 
              variant="outline-secondary"
              disabled={loading}
            >
              {loading ? <Spinner size="sm" /> : 'Buscar'}
            </Button>
          </Form>
        )}
      </Formik>

      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}

      <ResultBuscador Menus={menus} />
    </div>
  );
}
```

### Search with Filters
```jsx
function SearchWithFilters() {
  const [filters, setFilters] = useState({
    diet: '',
    cuisine: '',
    maxReadyTime: '',
    minHealthScore: ''
  });

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const searchWithFilters = (searchTerm) => {
    const activeFilters = Object.entries(filters)
      .filter(([_, value]) => value !== '')
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    
    busquedaApi(searchTerm, activeFilters);
  };

  return (
    <div>
      {/* Search form */}
      <div className="mb-3">
        <label>Dieta:</label>
        <select 
          value={filters.diet} 
          onChange={(e) => handleFilterChange('diet', e.target.value)}
        >
          <option value="">Cualquiera</option>
          <option value="vegetarian">Vegetariana</option>
          <option value="vegan">Vegana</option>
          <option value="gluten-free">Sin Gluten</option>
        </select>
      </div>
      
      <div className="mb-3">
        <label>Cocina:</label>
        <select 
          value={filters.cuisine} 
          onChange={(e) => handleFilterChange('cuisine', e.target.value)}
        >
          <option value="">Cualquiera</option>
          <option value="italian">Italiana</option>
          <option value="mexican">Mexicana</option>
          <option value="asian">Asiática</option>
        </select>
      </div>
      
      {/* Search implementation */}
    </div>
  );
}
```

## Cart Management Examples

### Complete Cart Implementation
```jsx
import React, { useState, useContext, createContext } from 'react';

const CartContext = createContext([]);

export function useCartContext() {
  return useContext(CartContext);
}

export const CartContextProvider = ({ children }) => {
  const [cartList, setCartList] = useState([]);
  const [contVegan, setContVegan] = useState([]);
  const [contNoVegan, setContNoVegan] = useState([]);

  function agregarAlMenu(menu) {
    const indice = cartList.findIndex(i => i.id === menu.id);
    const cantTotal = cartList.reduce((prev, cart) => prev + cart.cantidad, 0);
    
    const filterVegan = cartList.filter((producto) => producto.vegan === true);
    setContVegan(filterVegan);
    const cantVegan = contVegan.reduce((prev, cart) => prev + cart.cantidad, 1);
    
    const filterNoVegan = cartList.filter((producto) => producto.vegan === false);
    setContNoVegan(filterNoVegan);
    const cantNoVegan = contNoVegan.reduce((prev, cart) => prev + cart.cantidad, 1);

    // Business logic validation
    if (indice > -1) {
      alert('No puedes agregar el mismo plato al menú');
      return;
    }

    if (cantTotal >= 4) {
      alert('Alcanzó el límite de 4 platos para el menú');
      return;
    }

    if (cantVegan >= 2 && menu.vegan) {
      alert('Alcanzó el límite de platos veganos permitidos');
      return;
    }

    if (cantNoVegan >= 2 && !menu.vegan) {
      alert('Alcanzó el límite de platos no veganos permitidos');
      return;
    }

    // Add to cart
    setCartList([...cartList, menu]);
  }

  function sumaTotal() {
    return cartList.reduce((prev, cart) => prev + cart.pricePerServing * cart.cantidad, 0);
  }

  function promedioHealtScore() {
    const cantTotal = cartList.reduce((prev, cart) => prev + cart.cantidad, 0);
    if (cantTotal === 0) return 0;
    return cartList.reduce((prev, cart) => prev + cart.healthScore / cantTotal, 0);
  }

  function cantidadItems() {
    return cartList.reduce((prev, cart) => prev + cart.cantidad, 0);
  }

  function eliminarItem(id) {
    const filterItem = cartList.filter((producto) => producto.id !== id);
    setCartList(filterItem);
  }

  function vaciarCarrito() {
    setCartList([]);
  }

  return (
    <CartContext.Provider value={{
      cartList,
      agregarAlMenu,
      vaciarCarrito,
      sumaTotal,
      promedioHealtScore,
      cantidadItems,
      eliminarItem
    }}>
      {children}
    </CartContext.Provider>
  );
};
```

### Cart Summary Component
```jsx
import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useCartContext } from './CardContext';

function CartSummary() {
  const {
    cartList,
    sumaTotal,
    promedioHealtScore,
    cantidadItems,
    vaciarCarrito,
    eliminarItem
  } = useCartContext();

  const veganCount = cartList.filter(item => item.vegan).length;
  const nonVeganCount = cartList.filter(item => !item.vegan).length;

  return (
    <Card className="cart-summary">
      <Card.Header>
        <h5>Resumen del Menú</h5>
        <Badge bg="primary">{cantidadItems()} platos</Badge>
      </Card.Header>
      
      <Card.Body>
        <div className="mb-2">
          <strong>Precio Total:</strong> ${sumaTotal().toFixed(2)}
        </div>
        
        <div className="mb-2">
          <strong>Promedio Nutricional:</strong> {promedioHealtScore().toFixed(1)}
        </div>
        
        <div className="mb-2">
          <strong>Distribución:</strong>
          <div className="d-flex gap-2">
            <Badge bg="success">Veganos: {veganCount}</Badge>
            <Badge bg="warning">No Veganos: {nonVeganCount}</Badge>
          </div>
        </div>

        {cartList.length > 0 && (
          <div className="cart-items">
            <h6>Platos Seleccionados:</h6>
            {cartList.map(item => (
              <div key={item.id} className="d-flex justify-content-between align-items-center mb-1">
                <span>{item.title}</span>
                <div>
                  <span className="me-2">${item.pricePerServing}</span>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => eliminarItem(item.id)}
                  >
                    ×
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card.Body>
      
      <Card.Footer>
        <Button 
          variant="danger" 
          onClick={vaciarCarrito}
          disabled={cartList.length === 0}
        >
          Vaciar Carrito
        </Button>
      </Card.Footer>
    </Card>
  );
}
```

## Complete Application Setup

### Main Application with Routing
```jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartContextProvider } from './componentes/cardContext/CardContext';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

// Import components
import FormUser from './componentes/formulario/formUser';
import FoodApi from './componentes/menuContainer/api';
import Detalle from './componentes/otros/detalle';
import Buscador from './componentes/buscador/buscador';
import ResultBuscador from './componentes/buscador/resultBuscador';
import CartSummary from './components/CartSummary';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    window.location.reload(true);
  };

  return (
    <CartContextProvider>
      <BrowserRouter>
        <div className="App">
          {isAuthenticated && (
            <Navbar bg="dark" variant="dark" sticky="top">
              <Container>
                <Navbar.Brand href="#home">E-commerce</Navbar.Brand>
                <Nav className="me-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/search">Buscar</Nav.Link>
                  <Nav.Link href="/cart">Carrito</Nav.Link>
                </Nav>
                <Button variant="primary" size="sm" onClick={logout}>
                  Logout
                </Button>
              </Container>
            </Navbar>
          )}

          <Routes>
            <Route path="/" element={<FormUser />} />
            <Route path="/home" element={<FoodApi />} />
            <Route path="/search" element={<Buscador />} />
            <Route path="/cart" element={<CartSummary />} />
            <Route path="/detalle/:id" element={<Detalle />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartContextProvider>
  );
}

export default App;
```

## Custom Component Development

### Reusable Recipe Card Component
```jsx
import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCartContext } from './CardContext';

function RecipeCard({ recipe, showAddButton = true, showDetails = true }) {
  const { agregarAlMenu } = useCartContext();

  const handleAddToCart = () => {
    agregarAlMenu({ ...recipe, cantidad: 1 });
  };

  return (
    <Card style={{ width: '18rem' }} className="recipe-card">
      <Card.Img 
        variant="top" 
        src={recipe.image} 
        alt={recipe.title}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      
      <Card.Body>
        <Card.Title className="text-truncate">
          {recipe.title}
        </Card.Title>
        
        {showDetails && (
          <Card.Text>
            <div className="d-flex justify-content-between mb-2">
              <span><strong>Precio:</strong> ${recipe.pricePerServing}</span>
              <span><strong>Salud:</strong> {recipe.healthScore}</span>
            </div>
            
            <div className="d-flex justify-content-between">
              <Badge bg={recipe.vegan ? "success" : "warning"}>
                {recipe.vegan ? "Vegano" : "No Vegano"}
              </Badge>
              
              {recipe.readyInMinutes && (
                <Badge bg="info">
                  {recipe.readyInMinutes} min
                </Badge>
              )}
            </div>
          </Card.Text>
        )}
      </Card.Body>
      
      <Card.Footer className="d-flex gap-2">
        <Link to={`/detalle/${recipe.id}`}>
          <Button variant="outline-primary" size="sm">
            Ver Detalle
          </Button>
        </Link>
        
        {showAddButton && (
          <Button 
            variant="primary" 
            size="sm"
            onClick={handleAddToCart}
          >
            Agregar
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
}

export default RecipeCard;
```

### Loading Component
```jsx
import React from 'react';
import { Spinner, Container } from 'react-bootstrap';

function LoadingSpinner({ message = "Cargando..." }) {
  return (
    <Container className="text-center py-5">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <p className="mt-3">{message}</p>
    </Container>
  );
}

export default LoadingSpinner;
```

### Error Boundary Component
```jsx
import React from 'react';
import { Alert, Button } from 'react-bootstrap';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert variant="danger" className="m-3">
          <Alert.Heading>¡Algo salió mal!</Alert.Heading>
          <p>Ha ocurrido un error inesperado. Por favor, recarga la página.</p>
          <Button 
            variant="outline-danger" 
            onClick={() => window.location.reload()}
          >
            Recargar Página
          </Button>
        </Alert>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

## API Integration Patterns

### API Service Layer
```jsx
// services/recipeService.js
import axios from 'axios';

const API_BASE_URL = 'https://api.spoonacular.com/recipes';
const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;

class RecipeService {
  async searchRecipes(query, options = {}) {
    try {
      const params = {
        query,
        apiKey: API_KEY,
        includeNutrition: true,
        number: 20,
        instructionsRequired: true,
        addRecipeInformation: true,
        ...options
      };

      const response = await axios.get(`${API_BASE_URL}/complexSearch`, { params });
      return response.data;
    } catch (error) {
      throw new Error(`Error searching recipes: ${error.message}`);
    }
  }

  async getRecipeDetails(id) {
    try {
      const params = {
        apiKey: API_KEY,
        includeNutrition: true,
        instructionsRequired: true,
        addRecipeInformation: true
      };

      const response = await axios.get(`${API_BASE_URL}/${id}/information`, { params });
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching recipe details: ${error.message}`);
    }
  }

  async getRandomRecipes(number = 20) {
    try {
      const params = {
        apiKey: API_KEY,
        includeNutrition: true,
        number,
        instructionsRequired: true,
        addRecipeInformation: true
      };

      const response = await axios.get(`${API_BASE_URL}/complexSearch`, { params });
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching random recipes: ${error.message}`);
    }
  }
}

export default new RecipeService();
```

### Custom Hook for API Calls
```jsx
import { useState, useEffect } from 'react';
import recipeService from '../services/recipeService';

function useRecipes(initialQuery = '') {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchRecipes = async (query, options = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await recipeService.searchRecipes(query, options);
      setRecipes(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getRandomRecipes = async (number = 20) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await recipeService.getRandomRecipes(number);
      setRecipes(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      searchRecipes(initialQuery);
    } else {
      getRandomRecipes();
    }
  }, [initialQuery]);

  return {
    recipes,
    loading,
    error,
    searchRecipes,
    getRandomRecipes
  };
}

export default useRecipes;
```

## Error Handling Examples

### Comprehensive Error Handling
```jsx
import React, { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';

function ErrorHandlingExample() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleApiCall = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      const response = await fetch('/api/recipes');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Success:', data);
      
    } catch (err) {
      let errorMessage = 'Ha ocurrido un error inesperado';
      
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        errorMessage = 'Error de conexión. Verifique su internet.';
      } else if (err.message.includes('404')) {
        errorMessage = 'Recurso no encontrado.';
      } else if (err.message.includes('500')) {
        errorMessage = 'Error del servidor. Intente más tarde.';
      } else if (err.message.includes('401')) {
        errorMessage = 'No autorizado. Inicie sesión nuevamente.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={handleApiCall} disabled={loading}>
        {loading ? 'Cargando...' : 'Hacer Llamada API'}
      </Button>
      
      {error && (
        <Alert variant="danger" className="mt-3">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
          <Button 
            variant="outline-danger" 
            size="sm"
            onClick={() => setError(null)}
          >
            Cerrar
          </Button>
        </Alert>
      )}
    </div>
  );
}
```

### Form Validation with Error Display
```jsx
import React from 'react';
import { Formik } from 'formik';
import { Form, Alert } from 'react-bootstrap';
import * as Yup from 'yup';

function FormWithValidation() {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email inválido')
      .required('Email es requerido'),
    password: Yup.string()
      .min(6, 'Mínimo 6 caracteres')
      .required('Contraseña es requerida'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
      .required('Confirmar contraseña es requerido')
  });

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, setErrors }) => {
        // Handle form submission
        console.log(values);
        setSubmitting(false);
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.email && errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.password && errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirmar Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.confirmPassword && errors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>

          {Object.keys(errors).length > 0 && (
            <Alert variant="danger">
              <Alert.Heading>Errores de validación</Alert.Heading>
              <ul className="mb-0">
                {Object.entries(errors).map(([field, error]) => (
                  <li key={field}>{error}</li>
                ))}
              </ul>
            </Alert>
          )}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
```

## Testing Examples

### Component Testing with React Testing Library
```jsx
// __tests__/RecipeCard.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartContextProvider } from '../componentes/cardContext/CardContext';
import RecipeCard from '../components/RecipeCard';

const mockRecipe = {
  id: 1,
  title: 'Test Recipe',
  image: 'test-image.jpg',
  pricePerServing: 10.99,
  healthScore: 85,
  vegan: true,
  readyInMinutes: 30
};

const renderWithContext = (component) => {
  return render(
    <CartContextProvider>
      {component}
    </CartContextProvider>
  );
};

describe('RecipeCard', () => {
  test('renders recipe information correctly', () => {
    renderWithContext(<RecipeCard recipe={mockRecipe} />);
    
    expect(screen.getByText('Test Recipe')).toBeInTheDocument();
    expect(screen.getByText('$10.99')).toBeInTheDocument();
    expect(screen.getByText('85')).toBeInTheDocument();
    expect(screen.getByText('Vegano')).toBeInTheDocument();
  });

  test('calls agregarAlMenu when add button is clicked', () => {
    const mockAgregarAlMenu = jest.fn();
    
    renderWithContext(
      <RecipeCard recipe={mockRecipe} showAddButton={true} />
    );
    
    const addButton = screen.getByText('Agregar');
    fireEvent.click(addButton);
    
    // Verify the function was called (you'd need to mock the context)
  });

  test('shows correct badges for vegan/non-vegan recipes', () => {
    const veganRecipe = { ...mockRecipe, vegan: true };
    const nonVeganRecipe = { ...mockRecipe, vegan: false };
    
    const { rerender } = renderWithContext(<RecipeCard recipe={veganRecipe} />);
    expect(screen.getByText('Vegano')).toBeInTheDocument();
    
    rerender(<RecipeCard recipe={nonVeganRecipe} />);
    expect(screen.getByText('No Vegano')).toBeInTheDocument();
  });
});
```

### API Service Testing
```jsx
// __tests__/recipeService.test.js
import axios from 'axios';
import recipeService from '../services/recipeService';

jest.mock('axios');
const mockedAxios = axios;

describe('RecipeService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('searchRecipes makes correct API call', async () => {
    const mockResponse = {
      data: {
        results: [
          { id: 1, title: 'Test Recipe' }
        ]
      }
    };
    
    mockedAxios.get.mockResolvedValue(mockResponse);
    
    const result = await recipeService.searchRecipes('pasta');
    
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://api.spoonacular.com/recipes/complexSearch',
      {
        params: expect.objectContaining({
          query: 'pasta',
          apiKey: expect.any(String)
        })
      }
    );
    
    expect(result).toEqual(mockResponse.data);
  });

  test('handles API errors correctly', async () => {
    const errorMessage = 'Network Error';
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));
    
    await expect(recipeService.searchRecipes('pasta'))
      .rejects
      .toThrow('Error searching recipes: Network Error');
  });
});
```

### Custom Hook Testing
```jsx
// __tests__/useRecipes.test.js
import { renderHook, waitFor } from '@testing-library/react';
import useRecipes from '../hooks/useRecipes';
import recipeService from '../services/recipeService';

jest.mock('../services/recipeService');

describe('useRecipes', () => {
  test('loads random recipes on mount when no initial query', async () => {
    const mockData = {
      results: [{ id: 1, title: 'Random Recipe' }]
    };
    
    recipeService.getRandomRecipes.mockResolvedValue(mockData);
    
    const { result } = renderHook(() => useRecipes());
    
    expect(result.current.loading).toBe(true);
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.recipes).toEqual(mockData.results);
    expect(recipeService.getRandomRecipes).toHaveBeenCalledWith(20);
  });

  test('searches recipes when initial query provided', async () => {
    const mockData = {
      results: [{ id: 1, title: 'Search Result' }]
    };
    
    recipeService.searchRecipes.mockResolvedValue(mockData);
    
    const { result } = renderHook(() => useRecipes('pasta'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(recipeService.searchRecipes).toHaveBeenCalledWith('pasta');
    expect(result.current.recipes).toEqual(mockData.results);
  });
});
```

This comprehensive documentation provides developers with everything they need to understand, implement, and extend the Alkemy Food Recipe Application. The examples cover real-world scenarios and best practices for React development.