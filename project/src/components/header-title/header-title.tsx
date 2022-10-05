import { AppRoute } from '../../const';

type HeaderTitleProps = {
  location: string;
}

function HeaderTitle({location}: HeaderTitleProps): JSX.Element {
  return (
    location === AppRoute.Login
      ? <h1 className="page-title user-page__title">Sign in</h1>
      : <h1 className="page-title user-page__title">My list <span className="user-page__film-count">9</span></h1>
  );
}

export default HeaderTitle;
