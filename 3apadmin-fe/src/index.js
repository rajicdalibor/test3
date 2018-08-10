// @flow
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor, history } from './store';
import { registerDefaultInterceptor } from './helper';
import App from './containers/app';
import './styles/main.css';

registerDefaultInterceptor();

const target: ?HTMLElement = document.querySelector('#root');

if (target && target instanceof HTMLElement) {
  render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </PersistGate>
    </Provider>,
    target
  );
}
