## FoodApi

Lists random recipes from Spoonacular and links to details. Shows a loading spinner while fetching.

- **Export**: `default`
- **Props**: none
- **State**:
  - `Menus`: array of recipes
  - `loading`: boolean

### Usage
```jsx
import FoodApi from './componentes/menuContainer/api';

<FoodApi />
```

### API
- GET `https://api.spoonacular.com/recipes/complexSearch?...&number=20&random`

### Notes
- Move API key to environment configuration and avoid committing it.

