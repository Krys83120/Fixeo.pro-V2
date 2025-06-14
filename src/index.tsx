import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // ← React cherche ./App.tsx

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
