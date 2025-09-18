# Component Reference Guide

## Quick Reference

### Core Components

| Component | File | Purpose | Props | Key Features |
|-----------|------|---------|-------|--------------|
| `App` | `src/App.js` | Main app wrapper | None | Renders FormUser |
| `FormUser` | `src/componentes/formulario/formUser.js` | Authentication | None | Login form, JWT auth |
| `Menu` | `src/componentes/menu/menu.js` | Navigation & routing | `props` | Router setup, navbar |
| `Buscador` | `src/componentes/buscador/buscador.js` | Search form | None | Recipe search |
| `ResultBuscador` | `src/componentes/buscador/resultBuscador.js` | Search results | `Menus[]` | Card display |
| `FoodApi` | `src/componentes/menuContainer/api.js` | Recipe display | None | Random recipes |
| `Detalle` | `src/componentes/otros/detalle.js` | Recipe details | None | Detail view, cart |

### Context & State

| Context | File | Purpose | Key Methods |
|---------|------|---------|-------------|
| `CartContext` | `src/componentes/cardContext/CardContext.js` | Cart management | `agregarAlMenu`, `sumaTotal`, `eliminarItem` |

## Component Props Reference

### FormUser Component
```typescript
interface FormUserProps {
  // No props - manages internal state
}
```

### Menu Component
```typescript
interface MenuProps {
  props: {
    usuarioOk: boolean;
  };
}
```

### ResultBuscador Component
```typescript
interface ResultBuscadorProps {
  Menus: Recipe[];
}

interface Recipe {
  id: number;
  title: string;
  image: string;
  pricePerServing: number;
  healthScore: number;
  vegan: boolean;
}
```

## State Management Reference

### CartContext State
```typescript
interface CartContextType {
  cartList: Recipe[];
  contVegan: Recipe[];
  contNoVegan: Recipe[];
  agregarAlMenu: (recipe: Recipe) => void;
  vaciarCarrito: () => void;
  sumaTotal: () => number;
  promedioHealtScore: () => number;
  cantidadItems: () => number;
  eliminarItem: (id: number) => void;
}
```

## API Integration Reference

### Spoonacular API Endpoints

#### Search Recipes
```javascript
GET https://api.spoonacular.com/recipes/complexSearch
Query Parameters:
- query: string (search term)
- apiKey: string
- includeNutrition: boolean
- number: number (results count)
- instructionsRequired: boolean
- addRecipeInformation: boolean
```

#### Get Recipe Details
```javascript
GET https://api.spoonacular.com/recipes/{id}/information
Path Parameters:
- id: number (recipe ID)
Query Parameters:
- apiKey: string
- includeNutrition: boolean
- instructionsRequired: boolean
- addRecipeInformation: boolean
```

### Authentication API
```javascript
POST http://challenge-react.alkemy.org/
Body: {
  email: string,
  password: string
}
Response: {
  token: string
}
```

## Form Validation Schemas

### Login Form (Yup Schema)
```javascript
const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .min(2, 'Too Short!')
    .email('Invalid email')
    .required('Required')
});
```

### Search Form (Yup Schema)
```javascript
const SignupSchema = Yup.object().shape({
  search: Yup.string()
    .min(2, 'Debe tener 2 carcters minimo!')
});
```

## Business Rules

### Menu Creation Rules
1. Maximum 4 recipes per menu
2. Maximum 2 vegan recipes
3. Maximum 2 non-vegan recipes
4. No duplicate recipes allowed
5. Must have at least 2 vegan recipes

### Cart Management Rules
1. Items are added with quantity
2. Total price calculated per serving
3. Health score averaged across all items
4. Items can be removed individually
5. Cart can be cleared completely

## Error Handling

### Common Error Scenarios
1. **API Rate Limiting**: Handle 429 responses
2. **Network Errors**: Display user-friendly messages
3. **Validation Errors**: Show field-specific errors
4. **Authentication Failures**: Redirect to login
5. **Cart Limits**: Alert users about menu constraints

### Error Messages
```javascript
const errorMessages = {
  duplicateRecipe: 'no puedes agregar el mismo plato al menu',
  maxRecipes: 'Alcanso el limite de 4 platos para el menu',
  maxVegan: 'Alcanzo el limite de platos Veganos permitidos',
  maxNonVegan: 'Alcanzo el limite de platos no Veganos permitidos',
  authError: 'error al introducir email/password',
  networkError: 'Error de conexión. Intente nuevamente.'
};
```

## Styling Reference

### CSS Classes Used
- `.divForm`: Form container styling
- `.cards`: Card layout styling
- `.Columnas`: Column layout
- `.tituloApi`: API title styling
- `.fieldset`: Form fieldset styling

### Bootstrap Components Used
- `Button`: Various button styles
- `Card`: Recipe display cards
- `Form`: Form components
- `Modal`: Login feedback modal
- `Navbar`: Navigation bar
- `Spinner`: Loading indicators
- `Container`: Layout containers

## Performance Considerations

### Optimization Tips
1. **API Calls**: Debounce search inputs
2. **Images**: Lazy load recipe images
3. **State Updates**: Use useCallback for event handlers
4. **Re-renders**: Memoize expensive calculations
5. **Bundle Size**: Code split by routes

### Memory Management
1. Clean up API subscriptions
2. Clear timers and intervals
3. Remove event listeners
4. Clear local storage on logout

## Testing Guidelines

### Component Testing
```javascript
// Example test structure
import { render, screen } from '@testing-library/react';
import { CartContextProvider } from './CardContext';

const renderWithContext = (component) => {
  return render(
    <CartContextProvider>
      {component}
    </CartContextProvider>
  );
};
```

### API Testing
```javascript
// Mock API responses
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
```

## Deployment Checklist

### Pre-deployment
- [ ] Update API keys for production
- [ ] Test all user flows
- [ ] Verify responsive design
- [ ] Check error handling
- [ ] Validate form submissions
- [ ] Test cart functionality

### Environment Variables
```bash
REACT_APP_SPOONACULAR_API_KEY=production_key
REACT_APP_AUTH_ENDPOINT=production_endpoint
REACT_APP_ENVIRONMENT=production
```

## Troubleshooting

### Common Issues

#### 1. API Key Errors
**Problem**: 401 Unauthorized responses
**Solution**: Verify API key is correct and has sufficient quota

#### 2. CORS Issues
**Problem**: Cross-origin requests blocked
**Solution**: Ensure API endpoints support CORS or use proxy

#### 3. Cart State Issues
**Problem**: Cart not updating properly
**Solution**: Check CartContext provider wrapping

#### 4. Form Validation
**Problem**: Forms not validating
**Solution**: Verify Yup schema and Formik integration

#### 5. Routing Issues
**Problem**: Routes not working
**Solution**: Check BrowserRouter setup and route definitions