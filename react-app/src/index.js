import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import configureStore from './store';
import {ModalProvider} from "./components/Modal"
import ColorProvider from "./context/ColorContext"
const store = configureStore()
ReactDOM.render(
  <React.StrictMode>
    <ColorProvider>
      <ModalProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ModalProvider>
    </ColorProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
