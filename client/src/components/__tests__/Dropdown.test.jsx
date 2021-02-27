/* eslint-env jest */
import React from 'react';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import Dropdown from '../Dropdown/Dropdown.component';
import '@testing-library/jest-dom/extend-expect';

const dropdowmItems = ['item-1', 'item-2', 'item-3'];

describe('<Dropdown />', () => {
  it('should render dropdow with three items ', async () => {
    render(<Dropdown items={dropdowmItems} title="test tittle" />);
    await waitFor(() => fireEvent.click(screen.getByText('test tittle')));
    expect(screen.getAllByTestId('dropdown-item')).toHaveLength(3);
    expect(screen.getByText('item-1')).toBeInTheDocument();
    expect(screen.getByText('item-2')).toBeInTheDocument();
    expect(screen.getByText('item-3')).toBeInTheDocument();
  });
});
