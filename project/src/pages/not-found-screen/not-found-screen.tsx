import { Link } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">404</h1>
      </header>

      <div className="sign-in user-page__content">
        <p className="film-card__title">Page not found.</p>
        <p><Link to='/' className="catalog__genres-link">Back to Main</Link></p>
      </div>

      <Footer />
    </div>
  );
}

export default NotFoundScreen;
