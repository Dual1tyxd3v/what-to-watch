import { AuthStatus } from '../const';
import { store } from '../store';
import { UserData } from './user-data';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authStatus: AuthStatus;
  userInfo: UserData | null;
}
