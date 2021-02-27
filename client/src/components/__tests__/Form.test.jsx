/* eslint-env jest */
import React from 'react';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Form from '../Form/Form.component';
import '@testing-library/jest-dom/extend-expect';

const renderWithRouter = (component) => ({
  ...render(
    <MemoryRouter>
      {component}
    </MemoryRouter>,
  ),
});

describe('<Form />', () => {
  it('should render modal with car form', () => {
    renderWithRouter(<Form cars />);
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByTestId('car-form')).toBeInTheDocument();
  });
  it('should render modal with rental form', () => {
    renderWithRouter(<Form rentals />);
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByTestId('rental-form')).toBeInTheDocument();
  });
  it('should hide modal form onHideForm button', async () => {
    renderWithRouter(<Form rentals />);
    fireEvent.click(screen.getByText('Cancelar'));
    await waitFor(() => expect(screen.queryByTestId('modal')).not.toBeInTheDocument());
    expect(screen.queryByTestId('rental-form')).not.toBeInTheDocument();
  });
});
