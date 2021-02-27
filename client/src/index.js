/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// eslint-disable-next-line import/extensions
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ProvideAuth } from './contexts/auth-context';

ReactDOM.render(
  <ProvideAuth>
    <App />
  </ProvideAuth>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
