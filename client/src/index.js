//This is by far the most important file - Refer the flow below for better understanding
//Whenever the user goes to the weblink of the application - it runs the server & client side
//Index file or the ReactDOM render first
//Here, index is rendering the App, so the App.js starts running its code & the components in it are rendered depending upon the URL

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
