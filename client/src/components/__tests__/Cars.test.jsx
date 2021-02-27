/* eslint-env jest */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Cars from '../Cars/Cars.component';
import '@testing-library/jest-dom/extend-expect';

const list = [
  { id: 1, disponible: true },
  { id: 2, disponible: false },
];

const renderWithRouter = (component) => ({
  ...render(
    <MemoryRouter>
      {component}
    </MemoryRouter>,
  ),
});

describe('<Cars />', () => {
  it('shoudl show a message if the list is empty', () => {
    render(<Cars list={[]} />);
    expect(screen.getByTestId('empty-message')).toBeInTheDocument();
  });
  it('should show all cars', () => {
    renderWithRouter(<Cars list={list} />);
    expect(screen.getAllByTestId('car-card')).toHaveLength(2);
  });
  it('should show only availables cars', () => {
    renderWithRouter(<Cars list={list} filter="Disponibles" />);
    expect(screen.getByTestId('car-card')).toBeInTheDocument();
    expect(screen.getAllByTestId('car-card')).toHaveLength(1);
  });
});
