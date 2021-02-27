/* eslint-env jest */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Car from '../Cars/Car/Car.component';
import '@testing-library/jest-dom/extend-expect';

const car = {
  id: 1,
  disponible: true,
  marca: 'Ford',
  modelo: 'Fiesta',
  año: 2020,
};

const renderWithRouter = (component) => ({
  ...render(
    <MemoryRouter>
      {component}
    </MemoryRouter>,
  ),
});

describe('<Car />', () => {
  it('should render car with received props', () => {
    renderWithRouter(<Car car={car} />);
    expect(screen.getByText('Ford Fiesta')).toBeInTheDocument();
    expect(screen.getByText('2020')).toBeInTheDocument();
  });
});
