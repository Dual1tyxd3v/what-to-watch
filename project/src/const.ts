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
  Player = '/player',
  AddReview = '/films/:id/review'
}

export enum TextRating {
  Bad = 'Bad',
  Normal = 'Normal',
  Good = 'Good',
  VeryGood = 'Very Good',
  Awesome = 'Awesome',
}

export enum APIRoute {
  LogIn = '/login',
  LogOut = '/logout',
  Films = '/films',
  Comments = '/comments',
  Favorites = '/favorite',
  Promo = '/promo'
}

export const DISPLAY_FILMS_STEP = 8;

export const FilmNavLinks = ['Overview', 'Details', 'Reviews'];

export const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'Jule', 'August', 'September', 'October', 'November', 'December'];

export const ratingValues = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

export const MAX_LIKES_FILMS = 4;

export const DELAY_TO_PREVIEW = 1000;

export const SHOW_ERROR_TIMEOUT = 3000;

export const MIN_COMMENT_LENGTH = 50;
export const MAX_COMMENT_LENGTH = 400;

export enum NameSpace {
  User = 'USER',
  Data = 'DATA',
  App = 'APP'
}

export const passwordRegular = /\d\D|\D\d/g;
export const emailRegular = /\w{3}@\w{2}.\D{1}/ig;
