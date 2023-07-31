import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { MainView } from './components/Main';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const initialize = async () => {
  const container = document.getElementById("content");
  const root = ReactDOMClient.createRoot(container);
  root.render(<MainView />);
};
initialize(); 
