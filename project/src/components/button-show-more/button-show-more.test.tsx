import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ButtonShowMore from './button-show-more';

describe('Component: ButtonShowMore', () => {
  it('should render correctly', () => {
    render(
      <ButtonShowMore buttonClickHandler={jest.fn()} />
    );

    expect(screen.getByText(/show more/i)).toBeInTheDocument();
  });

  it('should called "buttonClickHandler" when user click button', async () => {
    const clickHandler = jest.fn();

    render(
      <ButtonShowMore buttonClickHandler={clickHandler} />
    );

    await userEvent.click(screen.getByRole('button'));

    expect(clickHandler).toBeCalledTimes(1);
  });
});
