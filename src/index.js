import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import App from './App';
import theme from './theme';
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={ theme }>
      <App/>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
