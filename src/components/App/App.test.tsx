import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

import { store } from '../../features/store';
import { App } from './App';

test('renders learn react link', () => {
  const { container } = render(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  expect(container.querySelector('.App')).toBeInTheDocument();
});
