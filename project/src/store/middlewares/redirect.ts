import { Middleware } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import { AppRoute } from '../../const';
import { reducer } from '../reducer';

type Reducer = ReturnType<typeof reducer>;
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
