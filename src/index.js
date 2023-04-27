import './assets/style/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-oldschool-dark'
import App from './App';

const options = {
  timeout: 3000,
  position: positions.TOP_CENTER,
  transitions: transitions.SCALE
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AlertProvider>
);


