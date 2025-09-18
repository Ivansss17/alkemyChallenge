## App

Root component of the application. Renders `FormUser` which handles authentication and the main app flow.

- **Export**: `default`
- **Props**: none
- **Uses**: `FormUser`

### Example
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

