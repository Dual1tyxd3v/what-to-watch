import MainScreen from '../../pages/main-screen/main-screen';

type AppProps = {
  name: string;
  genre: string;
  released: number;
}

function App({name, genre, released}: AppProps): JSX.Element {
  return <MainScreen name={name} released={released} genre={genre}/>;
}

export default App;
