import React from 'react';
import {
  NavLink,
} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { FiLogIn, FiLogOut, FiUserPlus } from 'react-icons/fi';
import { useAuth } from '../../contexts/auth-context';
import './Navbar.css';

const navBar = () => {
  const auth = useAuth();
  const logoutHandler = () => {
    auth.logout();
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        <img
          alt=""
          src="/titulo.png"
          width="120"
          height="60"
          className="d-inline-block align-top logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">

          <NavLink to="/cars" exact activeClassName="active" className="nav-link">
            Autos
          </NavLink>

          <NavLink to="/rentals" exact activeClassName="active" className="nav-link">
            Alquileres
          </NavLink>

        </Nav>
        {auth.user
          ? (
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text data-testid="navbar-username">
                Logeado como:
                {' '}
                <a href="#login">{auth.user.name}</a>
              </Navbar.Text>
              <Button variant="outline-danger" onClick={logoutHandler} style={{ marginLeft: '10px' }} data-testid="logout-button">
                Cerrar sesion
                {'      '}
                <FiLogOut />
              </Button>
            </Navbar.Collapse>
          )
          : (
            <Navbar.Collapse className="justify-content-end">
              <NavLink to="/login">
                <Button variant="outline-primary" style={{ marginRight: '5px' }} data-testid="login-button">
                  Iniciar sesion
                  <FiLogIn />
                </Button>
              </NavLink>
              <NavLink to="/signup" exact>
                <Button variant="outline-danger" data-testid="signup-button">
                  Registrarse
                  {' '}
                  <FiUserPlus />
                </Button>
              </NavLink>
            </Navbar.Collapse>
          )}

      </Navbar.Collapse>
    </Navbar>
  );
};

export default navBar;
