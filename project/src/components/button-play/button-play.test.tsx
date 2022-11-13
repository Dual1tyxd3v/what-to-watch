import { render, screen } from '@testing-library/react';
import ButtonPlay from './button-play';

describe('Component: ButtonPlay', () => {
  it('should render correctly', () => {
    render(<ButtonPlay />);

    expect(screen.getByTestId('playSvg')).toBeInTheDocument();
  });
});
