import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserData } from '../types/user-data';
import { AppDispatch, State } from '../types/store';
import { AxiosInstance } from 'axios';
import { APIRoute, SHOW_ERROR_TIMEOUT } from '../const';
import { redirectToRoute } from '../store/action';
import { AuthData } from '../types/auth-data';
import { CommentData } from '../types/comment-data';
import { Comments } from '../types/comments';
import { Film, Films } from '../types/film';
import { dropToken, saveToken } from './token';
import { setError } from '../store/app-process/app-process';

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch; state: State; extra: AxiosInstance;
}>(
  'USER/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<UserData>(APIRoute.LogIn);
    return data;
  }
);

export const fetchFilmsAction = createAsyncThunk<Films, undefined, {
  dispatch: AppDispatch; state: State; extra: AxiosInstance;
}>(
  'DATA/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Films>(APIRoute.Films);
    return data;
  },
);

export const fetchFilmAction = createAsyncThunk<Film, string, {
  dispatch: AppDispatch; state: State; extra: AxiosInstance;
}>(
  'DATA/fetchFilm',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Film>(`${APIRoute.Films}/${id}`);
    return data;
  },
);

export const fetchSimilarFilmsAction = createAsyncThunk<Films, string, {
  dispatch: AppDispatch; state: State; extra: AxiosInstance;
}>(
  'DATA/fetchSimilarFilms',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Films>(`${APIRoute.Films}/${id}/similar`);
    return data;
  },
);

export const fetchFavoriteFilmsAction = createAsyncThunk<Films, undefined, {
  dispatch: AppDispatch; state: State; extra: AxiosInstance;
}>(
  'DATA/fetchFavoriteFilms',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Films>(APIRoute.Favorites);
    return data;
  },
);

export const fetchPromoFilmAction = createAsyncThunk<Film, undefined, {
  dispatch: AppDispatch; state: State; extra: AxiosInstance;
}>(
  'DATA/fetchPromoFilm',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Film>(APIRoute.Promo);
    return data;
  },
);

/* export const changeFavoriteStatusAction = createAsyncThunk<void, ChangeFavoriteData, {
  dispatch: AppDispatch; state: State; extra: AxiosInstance;
}>(
  'DATA/changeFavoriteStatus',
  async ({filmId, status}, {dispatch, extra: api}) => {
    const {data} = await api.get<Film>(`${APIRoute.Favorites}/${filmId}/${status}`);
    dispatch(fetchFavoriteFilmsAction());
  },
); */

export const fetchCommentsAction = createAsyncThunk<Comments, string, {
  dispatch: AppDispatch; state: State; extra: AxiosInstance;
}>(
  'DATA/fetchComments',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Comments>(`${APIRoute.Comments}/${id}`);
    return data;
  },
);

export const postCommentAction = createAsyncThunk<Comments, CommentData, {
  dispatch: AppDispatch; state: State; extra: AxiosInstance;
}>(
  'DATA/postComment',
  async ({comment, rating, id}, {dispatch, extra: api}) => {
    const {data} = await api.post<Comments>(`${APIRoute.Comments}/${id}`, {comment, rating});
    dispatch(redirectToRoute(`films/${id}`));
    return data;
  }
);

export const clearErrorMessageAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch; state: State; extra: AxiosInstance;
}>(
  'APP/clearErrorMessage',
  (_arg, {dispatch, extra: api}) => {
    setTimeout(() => {
      dispatch(setError(null));
    }, SHOW_ERROR_TIMEOUT);
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch; state: State; extra: AxiosInstance;
}>(
  'USER/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.LogOut);
    dropToken();
  }
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch; state: State; extra: AxiosInstance;
}>(
  'USER/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.LogIn, {email, password});
    saveToken(data.token);
    return data;
  }
);
