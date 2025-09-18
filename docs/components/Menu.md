## Menu

Navigation shell and router for the app. Displays a navbar, a `Buscador` (search), and route-based content.

- **Export**: `default`
- **Props**: `{ props: { usuarioOk: boolean } }` (used to derive internal visibility state)
- **Routes**:
  - `/` → `FoodApi`
  - `/detalle/:id` → `Detalle`
  - `/Buscador` → `ResultBuscador`
- **Context**: Wraps children with `CartContextProvider`
- **Actions**: `Logout` clears `localStorage.token` and reloads the page

### Usage
```jsx
import Menu from './componentes/menu/menu';

// Render after successful authentication
<Menu props={{ usuarioOk: false }} />
```

