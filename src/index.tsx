import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx'; // Chemin corrigé pour pointer vers le même dossier src
import './index.css'; // Assurez-vous que ce fichier existe si vous avez du CSS global

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
