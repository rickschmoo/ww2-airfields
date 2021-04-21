import React from 'react';
// import { render } from 'react-testing-library';
import { render } from '@testing-library/react';
import MapContainer from '../map-component';

describe('MapContainer', () => {
  it('should render without crashing', () => {
    const { container } = render(<MapContainer lat={0.0} long={0.0}/>);
  
    expect(container).toHaveTextContent('Loading...');
  });
});

