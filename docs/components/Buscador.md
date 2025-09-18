## Buscador

Search component that queries the Spoonacular API and renders results via `ResultBuscador`.

- **Export**: `default`
- **Props**: none
- **State**: `Menus` (array of recipe search results)
- **Validation**: Yup schema requires `search` ≥ 2 characters

### Usage
```jsx
import Buscador from './componentes/buscador/buscador';

<Buscador />
```

### API
- GET `https://api.spoonacular.com/recipes/complexSearch?query={search}&...`
  - Include your own `apiKey` via environment variables in production.

