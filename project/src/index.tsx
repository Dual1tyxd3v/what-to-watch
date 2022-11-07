import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import browserHistory from './browser-history';
import App from './components/app/app';
import ErrorMessage from './components/error-message/error-message';
import HistoryRouter from './components/history-router/history-router';
import { checkAuthAction, fetchFilmsAction } from './services/api-actions';
import { store } from './store';

store.dispatch(fetchFilmsAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <HistoryRouter history={browserHistory}>
    <React.StrictMode>
      <Provider store={store}>
        <ErrorMessage />
        <App />
      </Provider>
    </React.StrictMode>
  </HistoryRouter>
);
