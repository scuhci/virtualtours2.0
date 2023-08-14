import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './react-components/App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from '../src/contexts/UserContext';

const initialize = async () => {
  const container = document.getElementById("content");
  const root = ReactDOMClient.createRoot(container);
  root.render(
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  );
};
initialize(); 
