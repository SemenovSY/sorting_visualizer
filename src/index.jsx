import ReactDOM from 'react-dom';
import { Provider } from "react-redux";

import store from 'store';

import App from './app';

import './globalStyles';

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('app')
);
