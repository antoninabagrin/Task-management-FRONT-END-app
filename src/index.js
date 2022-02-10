import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </CssBaseline>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
