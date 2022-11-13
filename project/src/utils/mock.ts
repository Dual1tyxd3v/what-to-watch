import { commerce, datatype, date, image, internet, lorem, name } from 'faker';
import { Comment, Comments } from '../types/comments';
import { Film, Films } from '../types/film';
import { UserData } from '../types/user-data';

const fullName = `${name.firstName()} ${name.lastName()}`;

export const makeFakeFilm = (): Film => ({
  id: datatype.number(),
  name: name.title(),
  posterImage: image.imageUrl(),
  previewImage: image.imageUrl(),
  backgroundImage: image.imageUrl(),
  backgroundColor: commerce.color(),
  videoLink: internet.url(),
  previewVideoLink: internet.url(),
  description: lorem.text(),
  rating: datatype.number({min: 1, max: 10}),
  scoresCount: datatype.number(),
  director: fullName,
  starring: new Array(datatype.number({min: 1, max: 6})).fill(fullName) as string[],
  runTime: datatype.number({min: 15, max: 240}),
  genre: lorem.word(8),
  released: datatype.number({min: 1950, max: 2022}),
  isFavorite: datatype.boolean()
});

export const makeFakeFilms = (minimum?: number): Films => new Array(datatype.number({min: minimum || 1, max: 25})).fill(makeFakeFilm()) as Films;

export const makeFakeUser = (): UserData => ({
  avatarUrl: internet.avatar(),
  email: internet.email(),
  id: datatype.number(),
  name: name.firstName(),
  token: lorem.word()
});

export const makeFakeComment = (): Comment => ({
  comment: lorem.words(),
  date: date.between(2000, new Date()).toString(),
  id: datatype.number(),
  rating: datatype.number(),
  user: {
    id: datatype.number(),
    name: fullName
  },
});

export const makeFakeComments = (): Comments => new Array(datatype.number({min: 1, max: 10})).fill(makeFakeComment()) as Comments;
