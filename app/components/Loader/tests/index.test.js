import React from 'react';

import { render, cleanup, waitForElement } from '@testing-library/react';
// this adds custom jest matchers from jest-dom
import '@testing-library/jest-dom';

import Loader from '../index';

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe('<Loader />', () => {
  it('should render its text', async () => {
    const id = 'testId';
    const { getByTestId } = render(<Loader data-testid={id} />);
    await waitForElement(() => getByTestId(id));
  });
});
