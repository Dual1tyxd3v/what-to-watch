import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';

function LoadingScreen(): JSX.Element {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
      </header>

      <div className="sign-in user-page__content">
        <p className="film-card__title">...loading...</p>
      </div>

      <Footer />
    </div>
  );
}

export default LoadingScreen;
