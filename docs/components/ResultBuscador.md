## ResultBuscador

Presents search results as Bootstrap cards with links to the `Detalle` page for each recipe.

- **Export**: `default`
- **Props**:
  - `Menus: Array<{ id: number, title: string, image: string, pricePerServing: number, healthScore: number, vegan: boolean }>`

### Usage
```jsx
import ResultBuscador from './componentes/buscador/resultBuscador';

<ResultBuscador Menus={menusArray} />
```

