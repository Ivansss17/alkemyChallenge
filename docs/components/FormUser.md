## FormUser

Authentication form and entry point to the app UI. Handles login against `http://challenge-react.alkemy.org/` using Formik + Yup and stores a token in `localStorage`. When a valid token is present, renders `Menu`.

- **Export**: `default`
- **Props**: none
- **External deps**: Axios, Formik, Yup, React-Bootstrap
- **Side effects**: writes/reads `localStorage.token`, shows a modal on submit

### Usage
```jsx
import FormUser from './componentes/formulario/formUser';

export default function App() {
  return <FormUser />;
}
```

### Behavior
- Validates `email` and `password` (basic checks + email format).
- Submits to the Alkemy challenge endpoint; on success stores `token` and updates UI.
- When `localStorage.token` equals the expected token, passes `{ usuarioOk: false }` to `Menu` via the `props` prop.

### Notes
- Replace hardcoded tokens and API URLs with environment variables for production.

