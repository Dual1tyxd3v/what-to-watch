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

export enum TextRating {
  Bad = 'Bad',
  Normal = 'Normal',
  Good = 'Good',
  VeryGood = 'Very Good',
  Awesome = 'Awesome',
}

export enum Genres {
  AllGenres = 'All Genres',
  Comedies = 'Comedies',
  Crime = 'Crime',
  Documentary = 'Documentary',
  Dramas = 'Dramas',
  Horror = 'Horror',
  KidsAndFamily = 'Kids & Family',
  Romance = 'Romance',
  SciFi = 'Sci-Fi',
  Thrillers = 'Thrillers'
}

export const FilmNavLinks = ['Overview', 'Details', 'Reviews'];

export const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'Jule', 'August', 'September', 'October', 'November', 'December'];

export const ratingValues = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

export const MAX_LIKES_FILMS = 4;

export const DELAY_TO_PREVIEW = 1000;
