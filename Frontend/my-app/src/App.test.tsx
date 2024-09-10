import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const hello = screen.getByText('Hello Rogue World!');
  expect(hello).toBeInTheDocument();
});
