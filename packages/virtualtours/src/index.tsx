import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './css/landing.css';
import 'bootstrap/dist/js/bootstrap.js';
import App from './react-components/App';
import { BrowserRouter } from 'react-router-dom';

const initialize = async () => {
  const container = document.getElementById("content");
  const root = ReactDOMClient.createRoot(container);
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};
initialize(); 
