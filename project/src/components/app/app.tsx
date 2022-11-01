import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../const';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import FilmScreen from '../../pages/film-screen/film-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import MainScreen from '../../pages/main-screen/main-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import PrivateRoute from '../private-route/private-route';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainScreen />}/>
        <Route path={AppRoute.MyList} element={
          <PrivateRoute auth={AuthStatus.Auth}>
            <MyListScreen />
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.Login} element={<LoginScreen />} />
        <Route path={AppRoute.Films} element={<FilmScreen />} />
        <Route path={AppRoute.Player} element={<PlayerScreen />} />
        <Route path={AppRoute.AddReview} element={<AddReviewScreen />} />
        <Route path='*' element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
