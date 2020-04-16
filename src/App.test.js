import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('it should render layout', () => {
  const { container } = render(<App />);
  const layout = container.querySelector(".layout");
  expect(layout).toBeInTheDocument();
});
