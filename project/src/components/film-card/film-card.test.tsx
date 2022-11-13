import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import { makeFakeFilm } from '../../utils/mock';
import HistoryRouter from '../history-router/history-router';
import FilmCard from './film-card';

const history = createMemoryHistory();
const mockFilm = makeFakeFilm();

describe('Component: FilmCard', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <FilmCard film={mockFilm} isPlaying={false} onActiveFilm={jest.fn()} />
      </HistoryRouter>
    );

    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByTestId('videoContainer')).toBeInTheDocument();
  });

  it('should called "onActiveFilm" when user init "mouseEnter" event', async () => {
    const mouseEnter = jest.fn();
    render(
      <HistoryRouter history={history}>
        <FilmCard film={mockFilm} isPlaying={false} onActiveFilm={mouseEnter} />
      </HistoryRouter>
    );
    const article = screen.getByRole('article');

    await userEvent.hover(article);

    expect(mouseEnter).toBeCalledTimes(1);
    expect(mouseEnter).nthCalledWith(1, mockFilm.id, 'mouseenter');
  });

  it('should called "onActiveFilm" when user init "mouseLeave" event', async () => {
    const mouseLeave = jest.fn();
    render(
      <HistoryRouter history={history}>
        <FilmCard film={mockFilm} isPlaying={false} onActiveFilm={mouseLeave} />
      </HistoryRouter>
    );
    const article = screen.getByRole('article');

    await userEvent.unhover(article);

    expect(mouseLeave).toBeCalledTimes(1);
    expect(mouseLeave).nthCalledWith(1, mockFilm.id, 'mouseleave');
  });

  it('should redirect to "/films/*" when user click link', async () => {
    history.push(AppRoute.Main);

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route path={AppRoute.Main} element={
            <FilmCard
              film={mockFilm}
              isPlaying={false}
              onActiveFilm={jest.fn()}
            />
          }
          />
          <Route path={AppRoute.Films} element={<h1>Film screen</h1>} />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.queryByText(/film screen/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(/film screen/i)).toBeInTheDocument();
    expect(history.location.pathname).toBe(`/films/${mockFilm.id}`);
  });
});
