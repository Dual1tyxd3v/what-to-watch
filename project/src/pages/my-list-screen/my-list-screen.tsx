import FilmList from '../../components/film-list/film-list';
import Footer from '../../components/footer/footer';
import HeaderNav from '../../components/header-nav/header-nav';
import Logo from '../../components/logo/logo';
import { useAppSelector } from '../../hooks';

function MyListScreen(): JSX.Element {
  const {films} = useAppSelector((state) => state);
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">9</span></h1>
        <HeaderNav />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <FilmList films={films} />
      </section>

      <Footer />
    </div>
  );
}

export default MyListScreen;
