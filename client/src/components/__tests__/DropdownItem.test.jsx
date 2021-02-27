/* eslint-env jest */
import React from 'react';
import { render, screen } from '@testing-library/react';
import DropdownItem from '../Dropdown/DropdownItem/DropdownItem.component';
import '@testing-library/jest-dom/extend-expect';

describe('<DropdownItem />', () => {
  it('should render a dropdown item with the name received in props', () => {
    render(<DropdownItem name="test-item" />);
    expect(screen.getByTestId('dropdown-item').textContent).toBe('test-item');
  });
  it('should set active className when name and active props match', () => {
    render(<DropdownItem name="test-item" active="test-item" />);
    expect(screen.getByTestId('dropdown-item').className).toContain('active');
  });
});
