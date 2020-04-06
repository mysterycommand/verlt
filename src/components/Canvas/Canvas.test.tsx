import { render } from '@testing-library/react';
import React from 'react';

import { Canvas } from './Canvas';

test('renders learn react link', () => {
  const { container } = render(<Canvas />);
  expect(container.querySelector('canvas')).toBeInTheDocument();
});
