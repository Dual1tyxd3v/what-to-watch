import { render, screen } from '@testing-library/react';
import ButtonPause from './button-pause';

describe('Component: ButtonPause', () => {
  it('should render correctly', () => {
    render(<ButtonPause />);

    expect(screen.getByTestId('pauseSvg')).toBeInTheDocument();
  });
});
