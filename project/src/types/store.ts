import { AuthStatus } from '../const';
import { store } from '../store';
import { Comments } from './comments';
import { Films, Film } from './film';
import { UserData } from './user-data';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authStatus: AuthStatus;
  userInfo: UserData | null;
}

export type AppProcess = {
  error: string | null;
  selectedGenre: string;
}

export type DataProcess = {
  films: Films;
  authStatus: AuthStatus;
  isDataLoaded: boolean;
  film: Film | null;
  similarFilms: Films;
  comments: Comments;
  isPostLoading: boolean;
  isFavoritesLoading: boolean;
  promoFilm: Film | null;
  favoriteFilms: Films;
}
