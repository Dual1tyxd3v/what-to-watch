import MainScreen from '../../pages/main-screen/main-screen';

type AppProps = {
  name: string;
  genre: string;
  year: string;
}

function App({name, genre, year}: AppProps): JSX.Element {
  return <MainScreen name='The Grand Budapest Hotel' year='2014' genre='Drama'/>;
}

export default App;
