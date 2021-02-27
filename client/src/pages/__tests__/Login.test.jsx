/* eslint-env jest */
import React from 'react';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../auth/login';
import '@testing-library/jest-dom/extend-expect';
import AuthContext from '../../contexts/auth-context';

const renderWithRouter = (component) => ({
  ...render(
    <MemoryRouter>
      {component}
    </MemoryRouter>,
  ),
});

describe('<Login />', () => {
  it('should render and submi the complete form', async () => {
    const login = jest.fn();
    renderWithRouter(
      <AuthContext.Provider value={{ login }}>
        <Login />
      </AuthContext.Provider>,
    );

    fireEvent.change(screen.getByLabelText('Direccion de email'), { target: { value: 'usuario@test.com.ar' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'test123' } });

    fireEvent.click(screen.getByTestId('login-button'));

    await waitFor(() => expect(login).toHaveBeenCalledTimes(1));
  });
  it('show error on invalid login', async () => {
    const login = jest.fn(() => { throw Error('user not found'); });
    renderWithRouter(
      <AuthContext.Provider value={{ login }}>
        <Login />
      </AuthContext.Provider>,
    );

    fireEvent.change(screen.getByLabelText('Direccion de email'), { target: { value: 'usuario@test.com.ar' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'test123' } });

    fireEvent.click(screen.getByTestId('login-button'));

    await waitFor(() => expect(screen.getByTestId('error-message').textContent).toBe('user not found'));
  });
});
