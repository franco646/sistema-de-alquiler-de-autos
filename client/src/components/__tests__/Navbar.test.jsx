/* eslint-env jest */
import React from 'react';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from '../navBar/Navbar';
import '@testing-library/jest-dom/extend-expect';
import AuthContext from '../../contexts/auth-context';

const renderWithRouter = (component) => ({
  ...render(
    <MemoryRouter>
      {component}
    </MemoryRouter>,
  ),
});

describe('<Navbar />', () => {
  describe('when the user is logged in', () => {
    const contextValues = {
      user: {
        name: 'test',
        id: 1,
      },
    };

    it('should show the user name', () => {
      renderWithRouter(
        <AuthContext.Provider value={contextValues}>
          <NavBar />
        </AuthContext.Provider>,
      );
      expect(screen.getByTestId('navbar-username').textContent).toContain('test');
    });

    it('should show logout button', () => {
      renderWithRouter(
        <AuthContext.Provider value={contextValues}>
          <NavBar />
        </AuthContext.Provider>,
      );
      expect(screen.getByTestId('logout-button')).toBeInTheDocument();
    });

    it('should logout user onClick logout button', async () => {
      const logout = jest.fn();
      renderWithRouter(
        <AuthContext.Provider value={{ ...contextValues, logout }}>
          <NavBar />
        </AuthContext.Provider>,
      );

      fireEvent.click(screen.getByTestId('logout-button'));
      await waitFor(() => expect(logout).toHaveBeenCalledTimes(1));
    });
  });
  describe('when the user is not logged in', () => {
    it('should show signup and login button', () => {
      renderWithRouter(
        <AuthContext.Provider value={{ user: null }}>
          <NavBar />
        </AuthContext.Provider>,
      );
      expect(screen.getByTestId('login-button')).toBeInTheDocument();
      expect(screen.getByTestId('signup-button')).toBeInTheDocument();
    });
  });
});
