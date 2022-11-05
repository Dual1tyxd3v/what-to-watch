import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, AuthStatus } from '../const';
import { changeIsDataLoading, setAuthStatus, setComments, setFilm, setFilms, setSimilarFilms, setUserInfo } from '../store/action';
import { AuthData } from '../types/auth-data';
import { Comments } from '../types/comments';
import { Film, Films } from '../types/film';
import { AppDispatch, State } from '../types/store';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from './token';

export const fetchFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch; state: State; extra: AxiosInstance;
}>(
  'DATA/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(changeIsDataLoading(true));
    const {data} = await api.get<Films>(APIRoute.Films);
    dispatch(setFilms(data));
    dispatch(changeIsDataLoading(false));
  },
);

export const fetchFilmAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch; state: State; extra: AxiosInstance;
}>(
  'DATA/fetchFilm',
  async (id, {dispatch, extra: api}) => {
    dispatch(changeIsDataLoading(true));
    const {data} = await api.get<Film>(`${APIRoute.Films}/${id}`);
    dispatch(setFilm(data));
    dispatch(changeIsDataLoading(false));
  },
);

export const fetchSimilarFilmsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch; state: State; extra: AxiosInstance;
}>(
  'DATA/fetchSimilarFilms',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Films>(`${APIRoute.Films}/${id}/similar`);
    dispatch(setSimilarFilms(data));
  },
);

export const fetchCommentsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch; state: State; extra: AxiosInstance;
}>(
  'DATA/fetchComments',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Comments>(`${APIRoute.Comments}/${id}`);
    dispatch(setComments(data));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch; state: State; extra: AxiosInstance;
}>(
  'USER/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserData>(APIRoute.LogIn);
      dispatch(setUserInfo(data));
      dispatch(setAuthStatus(AuthStatus.Auth));
    }
    catch {
      dispatch(setAuthStatus(AuthStatus.NoAuth));
    }
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch; state: State; extra: AxiosInstance;
}>(
  'USER/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.LogOut);
    dropToken();
    dispatch(setUserInfo(null));
    dispatch(setAuthStatus(AuthStatus.NoAuth));
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch; state: State; extra: AxiosInstance;
}>(
  'USER/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.LogIn, {email, password});
    saveToken(data.token);
    dispatch(setUserInfo(data));
    dispatch(setAuthStatus(AuthStatus.Auth));
  }
);
