import FilmList from '../../components/film-list/film-list';
import Footer from '../../components/footer/footer';
import HeaderNav from '../../components/header-nav/header-nav';
import Logo from '../../components/logo/logo';
import { useAppSelector } from '../../hooks';
import { fetchFavoriteFilmsAction } from '../../services/api-actions';
import { store } from '../../store';
import { getFavoriteFilms, getIsDataLoaded } from '../../store/data-process/selectors';
import LoadingScreen from '../loading-screen/loading-screen';

store.dispatch(fetchFavoriteFilmsAction());

function MyListScreen(): JSX.Element {
  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const isDataLoaded = useAppSelector(getIsDataLoaded);

  if (isDataLoaded) {
    return <LoadingScreen />;
  }
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{favoriteFilms.length}</span></h1>
        <HeaderNav />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <FilmList films={favoriteFilms} />
      </section>

      <Footer />
    </div>
  );
}

export default MyListScreen;
