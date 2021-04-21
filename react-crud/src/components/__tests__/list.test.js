import React from 'react';
// import { render } from 'react-testing-library';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import BoardUserList from '../board-user-list.component';

describe('BoardUserList', () => {
  it('should render without crashing', () => {
    const { container } = render(<BoardUserList/>);
  
    expect(container).toHaveTextContent('Search');
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(<BoardUserList/>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();    
  });

});

