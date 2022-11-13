import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ErrorMessage from './error-message';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store = mockStore({
  APP: {error: null}
});

describe('Component ErrorMessage', () => {
  it('should render correctly without error', () => {
    render(
      <Provider store={store}>
        <ErrorMessage />
      </Provider>
    );

    expect(screen.queryByRole('paragraph')).not.toBeInTheDocument();
  });

  it('should render correctly with error', () => {
    store = mockStore({
      APP: {error: 'some message'}
    });

    render(
      <Provider store={store}>
        <ErrorMessage />
      </Provider>
    );

    expect(screen.getByText(/some message/i)).toBeInTheDocument();
  });
});
