import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { makeFakeFilms } from '../../utils/mock';
import ButtonMyList from './button-my-list';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockFilms = makeFakeFilms();
const mockFilm = mockFilms[0];
const favoriteFilms = mockFilms.filter((film) => film.isFavorite === true);
type actionMeta = {
  arg: { filmId: number; status: number };
  requestId: string;
  requestStatus: string;
};

const store = mockStore({
  DATA: { favoriteFilms: favoriteFilms }
});

describe('Component: ButtonMyList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <ButtonMyList film={mockFilm} />
      </Provider>
    );

    expect(screen.getByText(/my list/i)).toBeInTheDocument();
    expect(screen.getByTestId(mockFilm.isFavorite ? 'inListSVG' : 'addSVG')).toBeInTheDocument();
    expect(screen.getByText(new RegExp(favoriteFilms.length.toString()))).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should called "changeFavoriteStatusAction" when user click on button', async () => {
    render(
      <Provider store={store}>
        <ButtonMyList film={mockFilm} />
      </Provider>
    );

    expect(store.getActions().length).toBe(0);

    await userEvent.click(screen.getByRole('button'));

    const actionData = store.getActions()[0].meta as actionMeta;
    expect(store.getActions()[0].type).toBe('DATA/changeFavoriteStatus/pending');
    expect(actionData.arg).toEqual({filmId: mockFilm.id, status: +!mockFilm.isFavorite});
  });
});
