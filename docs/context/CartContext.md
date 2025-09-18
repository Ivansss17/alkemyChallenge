## CartContext

Provides global state and helpers for the selected menu (cart). Use the `CartContextProvider` to wrap components and `useCartContext` to access actions and state.

- **Exports**:
  - `useCartContext(): { cartList, agregarAlMenu, vaciarCarrito, sumaTotal, promedioHealtScore, cantidadItems, eliminarItem }`
  - `CartContextProvider: React.FC`

### Value
- `cartList: Array<Menu>`: Selected recipes with optional `cantidad` quantity
- `agregarAlMenu(menu: Menu)`
  - Prevents duplicates
  - Enforces max 4 items
  - Enforces at most 2 vegan and 2 non-vegan items
- `vaciarCarrito()` clears all items
- `eliminarItem(id: number)` removes by `id`
- `sumaTotal(): number` total price based on `pricePerServing * cantidad`
- `promedioHealtScore(): number` average health score across items
- `cantidadItems(): number` total quantity

### Types
```
type Menu = {
  id: number
  title: string
  image: string
  pricePerServing: number
  healthScore: number
  vegan: boolean
  cantidad?: number
}
```

### Usage
```jsx
import { CartContextProvider, useCartContext } from './componentes/cardContext/CardContext';

function AppShell() {
  return (
    <CartContextProvider>
      {/* children */}
    </CartContextProvider>
  );
}

function AddButton({ menu }) {
  const { agregarAlMenu } = useCartContext();
  return <button onClick={() => agregarAlMenu({ ...menu, cantidad: 1 })}>Add</button>;
}
```

### Notes
- The vegan/non-vegan counters are derived from current `cartList` on each add; ensure `cantidad` is set when adding from `Detalle`.

