/* eslint-env jest */
import React from 'react';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Signup from '../auth/signup';
import '@testing-library/jest-dom/extend-expect';
import AuthContext from '../../contexts/auth-context';

const renderWithRouter = (component) => ({
  ...render(
    <MemoryRouter>
      {component}
    </MemoryRouter>,
  ),
});

describe('<Signup />', () => {
  it('should render and submi the complete form', async () => {
    const signup = jest.fn();
    renderWithRouter(
      <AuthContext.Provider value={{ signup }}>
        <Signup />
      </AuthContext.Provider>,
    );

    fireEvent.change(screen.getByLabelText('Direccion de email'), { target: { value: 'usuario@test.com.ar' } });
    fireEvent.change(screen.getByLabelText('Nombre de usuario'), { target: { value: 'usuario' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'test123' } });
    fireEvent.change(screen.getByLabelText('Repita la contraseña'), { target: { value: 'test123' } });

    fireEvent.click(screen.getByTestId('signup-button'));

    await waitFor(() => expect(signup).toHaveBeenCalledTimes(1));
  });
  it('should show error on invalid login', async () => {
    const signup = jest.fn(() => { throw Error('user already exists'); });
    renderWithRouter(
      <AuthContext.Provider value={{ signup }}>
        <Signup />
      </AuthContext.Provider>,
    );

    fireEvent.change(screen.getByLabelText('Direccion de email'), { target: { value: 'usuario@test.com.ar' } });
    fireEvent.change(screen.getByLabelText('Nombre de usuario'), { target: { value: 'usuario' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'test123' } });
    fireEvent.change(screen.getByLabelText('Repita la contraseña'), { target: { value: 'test123' } });

    fireEvent.click(screen.getByTestId('signup-button'));

    await waitFor(() => expect(screen.getByTestId('error-message').textContent).toBe('user already exists'));
  });
});
