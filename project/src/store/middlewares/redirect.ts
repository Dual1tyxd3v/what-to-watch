import { Middleware } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import { AppRoute } from '../../const';
import { rootReducer } from '../root-reducer';

type Reducer = ReturnType<typeof rootReducer>;
type MiddlewareAction = {
  payload: AppRoute;
  type: string;
}

export const redirect: Middleware<unknown, Reducer> = (_store) => (next) => (action: MiddlewareAction) => {
  if (action.type === 'app/redirectToRoute') {
    browserHistory.push(action.payload);
  }

  return next(action);
};
