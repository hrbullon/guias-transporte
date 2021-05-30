import React from 'react';
import ReactDOM from 'react-dom';

import './assets/scss/style.css';
import { Provider } from 'react-redux';
import { store } from './store/store'
import { AppRouter } from './routers/AppRouter.js';

ReactDOM.render(
  <Provider store={ store }>
    <AppRouter/>
  </Provider>
  ,document.getElementById('root')); 
