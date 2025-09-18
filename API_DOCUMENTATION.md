# Alkemy Food Recipe Application - API Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Components Documentation](#components-documentation)
4. [Context API Documentation](#context-api-documentation)
5. [Utility Functions](#utility-functions)
6. [External API Integration](#external-api-integration)
7. [Usage Examples](#usage-examples)
8. [Installation & Setup](#installation--setup)

## Project Overview

The Alkemy Food Recipe Application is a React-based web application that allows users to:
- Authenticate with email/password
- Browse and search for food recipes
- Create custom menus with dietary restrictions (vegan/non-vegan)
- View detailed recipe information
- Manage a shopping cart with nutritional tracking

### Key Features
- **Authentication System**: JWT-based login with form validation
- **Recipe Search**: Integration with Spoonacular API for recipe discovery
- **Menu Builder**: Smart menu creation with dietary constraints
- **Cart Management**: Context-based state management for selected items
- **Responsive Design**: Bootstrap-based UI components

## Architecture

```
src/
├── App.js                 # Main application component
├── index.js              # Application entry point
├── componentes/
│   ├── algo.js           # Sample data object
│   ├── buscador/         # Search functionality
│   │   ├── buscador.js   # Search form component
│   │   └── resultBuscador.js # Search results display
│   ├── cardContext/      # Global state management
│   │   └── CardContext.js # Cart context provider
│   ├── formulario/       # Authentication
│   │   └── formUser.js   # Login form component
│   ├── menu/             # Main navigation
│   │   └── menu.js       # Navigation and routing
│   ├── menuContainer/    # Recipe display
│   │   └── api.js        # Recipe API integration
│   └── otros/            # Additional components
│       └── detalle.js    # Recipe detail view
```

## Components Documentation

### App Component
**File**: `src/App.js`

The main application component that renders the user authentication form.

```jsx
import App from './App';

// Usage
<App />
```

**Props**: None

**Returns**: React Fragment containing the FormUser component

---

### FormUser Component
**File**: `src/componentes/formulario/formUser.js`

Handles user authentication with email and password validation.

#### Props
None

#### State
- `userok`: Object containing authentication status
- `msj`: Object containing user feedback messages
- `show`: Boolean for modal visibility
- `error`: Object containing error states and messages

#### Methods
- `tokenApi(values)`: Authenticates user credentials
- `handleClose()`: Closes modal and reloads page
- `handleShow()`: Opens modal

#### Usage Example
```jsx
import FormUser from './componentes/formulario/formUser';

function App() {
  return (
    <React.Fragment>
      <FormUser />
    </React.Fragment>
  );
}
```

#### Form Validation
- **Email**: Required, valid email format
- **Password**: Required field
- Uses Yup schema validation

---

### Menu Component
**File**: `src/componentes/menu/menu.js`

Main navigation component with routing and cart context provider.

#### Props
- `props`: Object containing user authentication status

#### Features
- Navigation bar with logout functionality
- React Router setup
- Cart context provider wrapper
- Search component integration

#### Usage Example
```jsx
import Menu from './componentes/menu/menu';

function App() {
  const userStatus = { usuarioOk: false };
  return <Menu props={userStatus} />;
}
```

#### Routes
- `/`: Home page with recipe selection
- `/detalle/:id`: Recipe detail page
- `/Buscador`: Search results page

---

### Buscador Component
**File**: `src/componentes/buscador/buscador.js`

Search form component for finding recipes by query.

#### Props
None

#### State
- `Menus`: Array of search results

#### Methods
- `busquedaApi(search)`: Performs API search with query

#### Usage Example
```jsx
import Buscador from './componentes/buscador/buscador';

function SearchPage() {
  return (
    <div>
      <Buscador />
    </div>
  );
}
```

#### Form Validation
- **Search**: Minimum 2 characters required

---

### ResultBuscador Component
**File**: `src/componentes/buscador/resultBuscador.js`

Displays search results in card format.

#### Props
- `Menus`: Array of recipe objects

#### Recipe Object Structure
```javascript
{
  id: number,
  title: string,
  image: string,
  pricePerServing: number,
  healthScore: number,
  vegan: boolean
}
```

#### Usage Example
```jsx
import ResultBuscador from './componentes/buscador/resultBuscador';

function SearchResults() {
  const searchResults = [
    {
      id: 123,
      title: "Pasta With Tuna",
      image: "https://example.com/image.jpg",
      pricePerServing: 5.99,
      healthScore: 85,
      vegan: false
    }
  ];
  
  return <ResultBuscador Menus={searchResults} />;
}
```

---

### FoodApi Component
**File**: `src/componentes/menuContainer/api.js`

Displays random recipes from the Spoonacular API.

#### Props
None

#### State
- `Menus`: Array of recipe objects
- `loading`: Boolean for loading state

#### Methods
- `llamadaApi()`: Fetches random recipes from API

#### Usage Example
```jsx
import FoodApi from './componentes/menuContainer/api';

function HomePage() {
  return (
    <div>
      <h1>Welcome to Recipe Selection</h1>
      <FoodApi />
    </div>
  );
}
```

---

### Detalle Component
**File**: `src/componentes/otros/detalle.js`

Displays detailed recipe information and cart management.

#### Props
None (uses URL parameters)

#### State
- `Menus`: Recipe object
- `count`: Quantity selector

#### Methods
- `onAdd(count)`: Adds recipe to cart
- `llamadaApi()`: Fetches detailed recipe information

#### Usage Example
```jsx
import Detalle from './componentes/otros/detalle';

// Access via route: /detalle/123
function RecipeDetail() {
  return <Detalle />;
}
```

## Context API Documentation

### CartContext
**File**: `src/componentes/cardContext/CardContext.js`

Global state management for cart functionality and menu building.

#### Context Provider
```jsx
import { CartContextProvider } from './componentes/cardContext/CardContext';

function App() {
  return (
    <CartContextProvider>
      {/* Your app components */}
    </CartContextProvider>
  );
}
```

#### Context Hook
```jsx
import { useCartContext } from './componentes/cardContext/CardContext';

function MyComponent() {
  const {
    cartList,
    agregarAlMenu,
    vaciarCarrito,
    sumaTotal,
    promedioHealtScore,
    cantidadItems,
    eliminarItem
  } = useCartContext();
}
```

#### State Properties
- `cartList`: Array of selected recipes
- `contVegan`: Array of vegan recipes
- `contNoVegan`: Array of non-vegan recipes

#### Methods

##### `agregarAlMenu(Menus)`
Adds a recipe to the cart with business logic validation.

**Parameters:**
- `Menus`: Recipe object to add

**Business Rules:**
- Maximum 4 recipes per menu
- Maximum 2 vegan recipes
- Maximum 2 non-vegan recipes
- No duplicate recipes allowed

**Usage Example:**
```jsx
const { agregarAlMenu } = useCartContext();

const handleAddRecipe = (recipe) => {
  agregarAlMenu(recipe);
};
```

##### `sumaTotal(Menus)`
Calculates total price of all items in cart.

**Returns:** Number (total price)

**Usage Example:**
```jsx
const { sumaTotal } = useCartContext();
const total = sumaTotal();
console.log(`Total: $${total}`);
```

##### `promedioHealtScore(Menus)`
Calculates average health score of all items in cart.

**Returns:** Number (average health score)

**Usage Example:**
```jsx
const { promedioHealtScore } = useCartContext();
const avgHealth = promedioHealtScore();
console.log(`Average Health Score: ${avgHealth}`);
```

##### `cantidadItems(Menus)`
Returns total number of items in cart.

**Returns:** Number (item count)

**Usage Example:**
```jsx
const { cantidadItems } = useCartContext();
const itemCount = cantidadItems();
console.log(`Items in cart: ${itemCount}`);
```

##### `eliminarItem(id)`
Removes a specific item from the cart.

**Parameters:**
- `id`: Recipe ID to remove

**Usage Example:**
```jsx
const { eliminarItem } = useCartContext();

const handleRemove = (recipeId) => {
  eliminarItem(recipeId);
};
```

##### `vaciarCarrito()`
Clears all items from the cart.

**Usage Example:**
```jsx
const { vaciarCarrito } = useCartContext();

const handleClearCart = () => {
  vaciarCarrito();
};
```

## Utility Functions

### Sample Data Object
**File**: `src/componentes/algo.js`

Contains sample recipe data for testing and development.

#### Exported Object
```javascript
export const objeto = {
  results: [
    {
      id: number,
      title: string,
      image: string,
      imageType: string,
      nutrition: {
        nutrients: [
          {
            name: string,
            amount: number,
            unit: string
          }
        ]
      }
    }
  ],
  offset: number,
  number: number,
  totalResults: number
}
```

#### Usage Example
```jsx
import { objeto } from './componentes/algo';

// Use for testing or as fallback data
const sampleRecipes = objeto.results;
```

## External API Integration

### Spoonacular API
The application integrates with the Spoonacular Recipe API for recipe data.

#### Endpoints Used

##### Recipe Search
```
GET https://api.spoonacular.com/recipes/complexSearch
```

**Parameters:**
- `query`: Search term
- `apiKey`: API authentication key
- `includeNutrition`: Include nutritional information
- `number`: Number of results to return
- `instructionsRequired`: Require cooking instructions
- `addRecipeInformation`: Include additional recipe details

**Usage Example:**
```javascript
const searchRecipes = async (query) => {
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${API_KEY}&includeNutrition=true&number=5&instructionsRequired=true&addRecipeInformation=true`
  );
  return response.data.results;
};
```

##### Recipe Details
```
GET https://api.spoonacular.com/recipes/{id}/information
```

**Parameters:**
- `id`: Recipe ID
- `apiKey`: API authentication key
- `includeNutrition`: Include nutritional information
- `instructionsRequired`: Require cooking instructions
- `addRecipeInformation`: Include additional recipe details

**Usage Example:**
```javascript
const getRecipeDetails = async (recipeId) => {
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}&includeNutrition=true&instructionsRequired=true&addRecipeInformation=true`
  );
  return response.data;
};
```

### Authentication API
```
POST http://challenge-react.alkemy.org/
```

**Request Body:**
```javascript
{
  email: string,
  password: string
}
```

**Response:**
```javascript
{
  token: string
}
```

## Usage Examples

### Complete Application Setup
```jsx
import React from 'react';
import { CartContextProvider } from './componentes/cardContext/CardContext';
import FormUser from './componentes/formulario/formUser';

function App() {
  return (
    <CartContextProvider>
      <FormUser />
    </CartContextProvider>
  );
}

export default App;
```

### Search Functionality Implementation
```jsx
import React, { useState } from 'react';
import Buscador from './componentes/buscador/buscador';
import ResultBuscador from './componentes/buscador/resultBuscador';

function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div>
      <Buscador />
      <ResultBuscador Menus={searchResults} />
    </div>
  );
}
```

### Cart Management Implementation
```jsx
import React from 'react';
import { useCartContext } from './componentes/cardContext/CardContext';

function CartSummary() {
  const {
    cartList,
    sumaTotal,
    promedioHealtScore,
    cantidadItems,
    vaciarCarrito
  } = useCartContext();

  return (
    <div>
      <h3>Cart Summary</h3>
      <p>Items: {cantidadItems()}</p>
      <p>Total: ${sumaTotal()}</p>
      <p>Average Health Score: {promedioHealtScore()}</p>
      <button onClick={vaciarCarrito}>Clear Cart</button>
    </div>
  );
}
```

### Recipe Detail with Add to Cart
```jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCartContext } from './componentes/cardContext/CardContext';
import axios from 'axios';

function RecipeDetail() {
  const { id } = useParams();
  const { agregarAlMenu } = useCartContext();
  const [recipe, setRecipe] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      );
      setRecipe(response.data);
    };
    fetchRecipe();
  }, [id]);

  const handleAddToCart = () => {
    if (recipe) {
      agregarAlMenu({ ...recipe, cantidad: quantity });
    }
  };

  if (!recipe) return <div>Loading...</div>;

  return (
    <div>
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} />
      <p>Price: ${recipe.pricePerServing}</p>
      <p>Health Score: {recipe.healthScore}</p>
      <p>Ready in: {recipe.readyInMinutes} minutes</p>
      
      <div>
        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          min="1"
        />
      </div>
      
      <button onClick={handleAddToCart}>Add to Menu</button>
    </div>
  );
}
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd alkemy-food-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure API keys**
Update the API keys in the following files:
- `src/componentes/buscador/buscador.js`
- `src/componentes/menuContainer/api.js`
- `src/componentes/otros/detalle.js`

4. **Start the development server**
```bash
npm start
```

5. **Build for production**
```bash
npm run build
```

### Environment Variables
Create a `.env` file in the root directory:
```
REACT_APP_SPOONACULAR_API_KEY=your_api_key_here
REACT_APP_AUTH_ENDPOINT=http://challenge-react.alkemy.org/
```

### Dependencies
- **React**: ^17.0.2 - UI framework
- **React Router DOM**: ^6.2.1 - Client-side routing
- **React Bootstrap**: ^2.1.2 - UI components
- **Axios**: ^0.26.0 - HTTP client
- **Formik**: ^2.2.9 - Form handling
- **Yup**: ^0.32.11 - Form validation
- **Bootstrap**: ^5.1.3 - CSS framework

### Scripts
- `npm start`: Start development server
- `npm run build`: Build for production
- `npm test`: Run tests
- `npm run eject`: Eject from Create React App

---

## Contributing

When contributing to this project:

1. Follow the existing code structure and naming conventions
2. Add proper JSDoc comments for new functions
3. Update this documentation for any new APIs or components
4. Test all functionality before submitting changes
5. Ensure responsive design compatibility

## License

This project is part of the Alkemy challenge and is for educational purposes.