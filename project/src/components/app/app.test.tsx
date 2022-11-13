import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeFilm, makeFakeFilms, makeFakeUser } from '../../utils/mock';
import { AppRoute, AuthStatus } from '../../const';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import App from './app';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockFilms = makeFakeFilms(9);
const mockPromoFilm = makeFakeFilm();
const mockUser = makeFakeUser();

let store = mockStore({
  USER: {authStatus: AuthStatus.Auth, userInfo: mockUser},
  APP: {selectedGenre: 'All Genres'},
  DATA: {promoFilm: mockPromoFilm, films: mockFilms, favoriteFilms: [], film: mockFilms[0], similarFilms: mockFilms}
});

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('App routing', () => {
  it('should render "Main" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByText(new RegExp(mockPromoFilm.name))).toBeInTheDocument();
    expect(screen.getByTestId('favoriteCounts').textContent).toBe('0');
    expect(screen.getByText(/all genres/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockFilms[0].genre))).toBeInTheDocument();
    expect(screen.getByText(/show more/i)).toBeInTheDocument();
  });

  it('should render "MyListScreen" when user navigate to "/mylist"', () => {
    history.push(AppRoute.MyList);

    render(fakeApp);

    expect(screen.getByText(/my list/i)).toBeInTheDocument();
    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
  });

  it('should render "LoginScreen" when user navigate to "/login"', () => {
    store = mockStore({
      USER: {authStatus: AuthStatus.NoAuth, userInfo: null},
      APP: {selectedGenre: 'All Genres'},
      DATA: {promoFilm: mockPromoFilm, films: mockFilms, favoriteFilms: []}
    });

    history.push(AppRoute.Login);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/email address/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button').textContent).toBe('Sign in');
  });

  it('should render "FilmScreen" when user navigate to "/films/*/"', () => {
    const mockFilm = mockFilms[0];
    history.push(`/films/${mockFilm.id}`);

    render(fakeApp);

    expect(screen.getByText(new RegExp(mockFilm.name))).toBeInTheDocument();
    expect(screen.getByText(/details/i)).toBeInTheDocument();
    expect(screen.getByText(/more like this/i)).toBeInTheDocument();
    expect(screen.getByText(/add review/i)).toBeInTheDocument();
  });

  it('should render "PlayerScreen" when user navigate to "/player/*/"', () => {
    const mockFilm = mockFilms[0];
    history.push(`/player/${mockFilm.id}`);

    render(fakeApp);

    expect(screen.getByText(new RegExp(mockFilm.name))).toBeInTheDocument();
    expect(screen.getByText(/exit/i)).toBeInTheDocument();
  });

  it('should render "AddReviewScreen" when user navigate to "/films/*/review"', () => {
    const mockFilm = mockFilms[0];
    history.push(`/films/${mockFilm.id}/review`);

    render(fakeApp);

    expect(screen.getByText(new RegExp(mockFilm.name))).toBeInTheDocument();
    expect(screen.getByText(/add review/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button').textContent).toBe('Post');
  });

  it('should render "NotFoundScreen" when user navigate to wrong route', () => {
    history.push('/some_wrong_url');

    render(fakeApp);

    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });
});
