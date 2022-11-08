import { store } from '../store';
import { setError } from '../store/app-process/app-process';
import { clearErrorMessageAction } from './api-actions';

export const apiErrorHandler = (message: string) => {
  store.dispatch(setError(message));
  store.dispatch(clearErrorMessageAction());
};
