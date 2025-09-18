## Detalle

Recipe detail page. Fetches a single recipe by `:id` and allows adding/removing it from the cart (menu) via `CartContext` helpers. Displays a summary card with totals.

- **Export**: `default`
- **Props**: none (uses `useParams` to read `id`)
- **Context**: `useCartContext()`
  - `agregarAlMenu(menuWithCantidad)`
  - `eliminarItem(id)`
  - `sumaTotal()`
  - `promedioHealtScore()`
  - `cantidadItems()`

### Usage
```jsx
import { Route } from 'react-router-dom';
import Detalle from './componentes/otros/detalle';

<Route path="/detalle/:id" element={<Detalle />} />
```

### API
- GET `https://api.spoonacular.com/recipes/{id}/information?includeNutrition=false&...`

