import { NameSpace } from '../../const';
import { State } from '../../types/store';

export const getFilm = (state: State) => state[NameSpace.Data].film;
export const getFilms = (state: State) => state[NameSpace.Data].films;
export const getIsDataLoaded = (state: State) => state[NameSpace.Data].isDataLoaded;
export const getSimilarFilms = (state: State) => state[NameSpace.Data].similarFilms;
export const getComments = (state: State) => state[NameSpace.Data].comments;
export const getFavoriteFilms = (state: State) => state[NameSpace.Data].favoriteFilms;
export const getPromoFilm = (state: State) => state[NameSpace.Data].promoFilm;
export const getIsPostLoading = (state: State) => state[NameSpace.Data].isPostLoading;
