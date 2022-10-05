import { Film } from './types/film';

export const filmMain: Film = {
  name: 'The Grand Budapest Hotel',
  genre: 'Drama',
  released: 2014
};

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum AppRoute {
  Main = '/',
  Login = '/login',
  MyList = '/mylist',
  Films = '/films/:id',
  Player = '/player/:id',
  AddReview = '/films/:id/review'
}
