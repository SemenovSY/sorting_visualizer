import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const isDevelopment = process.env.NODE_ENV === 'development';
const hasExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

const configureStore = () => {
  const buildAccordingEnv = isDevelopment && hasExtension
    ? compose(applyMiddleware(sagaMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__())
    : applyMiddleware(sagaMiddleware);

  const createdStore = createStore(reducers, buildAccordingEnv);

  sagaMiddleware.run(sagas);

  return createdStore;
};

const store = configureStore();

export default store;
