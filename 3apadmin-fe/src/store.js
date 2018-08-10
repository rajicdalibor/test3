// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import saga from './sagas';
export const history = createHistory();

const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['aaapuser'] // only aaapuser will be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const initialState = {};
const enhancers = [];
const middleware = [sagaMiddleware, routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;

  middleware.push(createLogger());

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

export const store = createStore(
  persistedReducer,
  initialState,
  composedEnhancers
);
sagaMiddleware.run(saga);
export const persistor = persistStore(store);
