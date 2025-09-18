# Quick Reference Guide

## 🚀 Getting Started

### Installation
```bash
npm install
npm start
```

### Key Files
- `src/App.js` - Main application
- `src/componentes/formulario/formUser.js` - Login form
- `src/componentes/cardContext/CardContext.js` - Cart management
- `src/componentes/menu/menu.js` - Navigation & routing

## 📋 Component Quick Reference

### Core Components
```jsx
// Main App
<App />

// Login Form
<FormUser />

// Navigation (after login)
<Menu props={{usuarioOk: false}} />

// Recipe Search
<Buscador />

// Search Results
<ResultBuscador Menus={recipeArray} />

// Recipe Display
<FoodApi />

// Recipe Details
<Detalle /> // Uses URL param :id
```

### Cart Context Usage
```jsx
import { useCartContext } from './componentes/cardContext/CardContext';

const {
  cartList,           // Array of selected recipes
  agregarAlMenu,      // Add recipe to cart
  vaciarCarrito,      // Clear cart
  sumaTotal,          // Calculate total price
  promedioHealtScore, // Calculate avg health score
  cantidadItems,      // Get item count
  eliminarItem        // Remove specific item
} = useCartContext();
```

## 🔧 API Integration

### Spoonacular API
```javascript
// Search recipes
GET https://api.spoonacular.com/recipes/complexSearch
?query=pasta&apiKey=YOUR_KEY&includeNutrition=true&number=5

// Get recipe details
GET https://api.spoonacular.com/recipes/{id}/information
?apiKey=YOUR_KEY&includeNutrition=true
```

### Authentication
```javascript
// Login
POST http://challenge-react.alkemy.org/
Body: { email: "string", password: "string" }
Response: { token: "string" }
```

## 📊 Data Structures

### Recipe Object
```javascript
{
  id: number,
  title: string,
  image: string,
  pricePerServing: number,
  healthScore: number,
  vegan: boolean,
  readyInMinutes?: number,
  cantidad?: number  // Added when in cart
}
```

### Cart State
```javascript
{
  cartList: Recipe[],
  contVegan: Recipe[],
  contNoVegan: Recipe[]
}
```

## 🎯 Business Rules

### Menu Creation
- ✅ Maximum 4 recipes per menu
- ✅ Maximum 2 vegan recipes
- ✅ Maximum 2 non-vegan recipes
- ❌ No duplicate recipes
- ✅ Must have at least 2 vegan recipes

### Validation Rules
```javascript
// Login form
email: required, valid email format
password: required

// Search form
search: minimum 2 characters
```

## 🛠 Common Patterns

### Adding Recipe to Cart
```jsx
const { agregarAlMenu } = useCartContext();

const handleAdd = (recipe) => {
  agregarAlMenu({ ...recipe, cantidad: 1 });
};
```

### API Call with Error Handling
```jsx
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const fetchData = async () => {
  setLoading(true);
  setError(null);
  
  try {
    const response = await axios.get(url);
    setData(response.data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

### Form with Validation
```jsx
<Formik
  initialValues={{ field: '' }}
  validationSchema={Yup.object().shape({
    field: Yup.string().required('Required')
  })}
  onSubmit={(values) => handleSubmit(values)}
>
  {({ values, errors, touched, handleChange, handleSubmit }) => (
    <Form onSubmit={handleSubmit}>
      <Form.Control
        name="field"
        value={values.field}
        onChange={handleChange}
        isInvalid={touched.field && errors.field}
      />
      <Form.Control.Feedback type="invalid">
        {errors.field}
      </Form.Control.Feedback>
    </Form>
  )}
</Formik>
```

## 🎨 Styling Classes

### CSS Classes
- `.divForm` - Form container
- `.cards` - Card layout
- `.Columnas` - Column layout
- `.tituloApi` - API titles
- `.fieldset` - Form fieldsets

### Bootstrap Components
- `Button` - Various button styles
- `Card` - Recipe cards
- `Form` - Form components
- `Modal` - Login feedback
- `Navbar` - Navigation
- `Spinner` - Loading indicators

## 🔍 Debugging Tips

### Common Issues
1. **Cart not updating**: Check CartContextProvider wrapping
2. **API errors**: Verify API key and endpoint
3. **Form validation**: Check Yup schema
4. **Routing issues**: Verify BrowserRouter setup
5. **Authentication**: Check token storage

### Console Commands
```javascript
// Check cart state
console.log(useCartContext());

// Check localStorage
console.log(localStorage.getItem('token'));

// Check API response
console.log(response.data);
```

## 📱 Responsive Design

### Bootstrap Breakpoints
- `xs`: <576px
- `sm`: ≥576px
- `md`: ≥768px
- `lg`: ≥992px
- `xl`: ≥1200px

### Card Layout
```jsx
<div className="cards">
  {recipes.map(recipe => (
    <Card style={{ width: '18rem' }}>
      {/* Card content */}
    </Card>
  ))}
</div>
```

## 🧪 Testing Quick Reference

### Component Test
```jsx
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

### API Mock
```jsx
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
```

## 🚀 Performance Tips

### Optimization
- Use `useCallback` for event handlers
- Memoize expensive calculations
- Lazy load images
- Debounce search inputs
- Code split by routes

### Memory Management
- Clean up API subscriptions
- Clear timers and intervals
- Remove event listeners
- Clear localStorage on logout

## 📦 Dependencies

### Core
- `react`: ^17.0.2
- `react-dom`: ^17.0.2
- `react-router-dom`: ^6.2.1

### UI
- `react-bootstrap`: ^2.1.2
- `bootstrap`: ^5.1.3

### Forms & Validation
- `formik`: ^2.2.9
- `yup`: ^0.32.11

### HTTP & API
- `axios`: ^0.26.0

## 🔐 Environment Variables

```bash
REACT_APP_SPOONACULAR_API_KEY=your_api_key
REACT_APP_AUTH_ENDPOINT=http://challenge-react.alkemy.org/
REACT_APP_ENVIRONMENT=development
```

## 📝 Scripts

```bash
npm start          # Development server
npm run build      # Production build
npm test           # Run tests
npm run eject      # Eject from CRA
```

## 🆘 Emergency Fixes

### Reset Cart
```jsx
const { vaciarCarrito } = useCartContext();
vaciarCarrito();
```

### Clear Authentication
```jsx
localStorage.removeItem('token');
window.location.reload();
```

### Reset Form
```jsx
// In Formik
resetForm();
```

### Force Re-render
```jsx
const [key, setKey] = useState(0);
// Add key={key} to component
// Call setKey(prev => prev + 1) to force re-render
```

---

## 📞 Support

For issues or questions:
1. Check this quick reference
2. Review the full API documentation
3. Check component examples
4. Verify business rules compliance
5. Test with sample data

**Happy Coding! 🎉**