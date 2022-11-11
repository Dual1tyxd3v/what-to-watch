import { FormEvent, useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import { AppRoute, AuthStatus, emailRegular, passwordRegular, SHOW_ERROR_TIMEOUT } from '../../const';
import { useAppDiapatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../services/api-actions';
import { getAuthStatus } from '../../store/user-process/selectors';

function LoginScreen(): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);
  const dispatch = useAppDiapatch();
  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (!error) {
      return;
    }
    const timer = setTimeout(() => {
      setError(null);
    }, SHOW_ERROR_TIMEOUT);
    return () => clearTimeout(timer);
  }, [error]);

  if (authStatus === AuthStatus.Auth) {
    return <Navigate to={AppRoute.Main} />;
  }

  function submitHandler(evt: FormEvent) {
    evt.preventDefault();
    if (!email.current || !password.current) {
      return;
    }

    if (!password.current.value.match(passwordRegular)) {
      setError('Please enter a valid password address');
      return;
    }
    if (!email.current.value.match(emailRegular)) {
      setError('Please enter a valid email address');
      return;
    }
    dispatch(loginAction({
      email: email.current.value,
      password: password.current.value
    }));
  }
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>
      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={submitHandler}>
          {
            error
              ?
              <div className="sign-in__message">
                <p>{error}</p>
              </div>
              : null
          }
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input className="sign-in__input" type="email" ref={email} placeholder="Email address" name="user-email" id="user-email" />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input className="sign-in__input" ref={password} type="password" placeholder="Password" name="user-password" id="user-password" />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default LoginScreen;
