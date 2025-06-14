import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../App'; // Chemin corrigé pour pointer vers le dossier parent
import './index.css'; // Assurez-vous que ce fichier existe si vous avez du CSS global

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
