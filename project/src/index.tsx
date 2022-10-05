import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { filmMain } from './const';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
const {name, genre, released} = filmMain;

root.render(
  <React.StrictMode>
    <App name={name} genre={genre} released={released} />
  </React.StrictMode>,
);
