/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom';
import './App.style.scss';
import NavBar from './components/navBar/Navbar';
import CarsList from './pages/cars/cars-list';
import RentalsList from './pages/rentals/RentalsList';
import Login from './pages/auth/login';
import Signup from './pages/auth/signup';
import { useAuth } from './contexts/auth-context';

let BASE_URL;
if (process.env.NODE_ENV === 'production') {
  BASE_URL = '';
} else if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:8080';
}

const App = () => {
  const auth = useAuth();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const expiryDate = localStorage.getItem('expiryDate');
    if (expiryDate && (Date.now() > expiryDate)) {
      auth.logout();
    }
    if (auth.user) {
      return setToken(JSON.parse(localStorage.getItem('auth-token')));
    }
    return null;
  });

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/cars" />
        </Route>
        <Route
          path="/login"
          component={() => (
            auth.user
              ? <Redirect to="/" />
              : <Login />)}
        />
        <Route
          path="/signup"
          component={() => (
            auth.user
              ? <Redirect to="/" />
              : <Signup />)}
        />
        <Route
          path="/cars"
          component={() => (
            auth.user
              ? <CarsList token={token} BASE_URL={BASE_URL} />
              : <Redirect to="/login" />
          )}
        />
        <Route
          path="/rentals"
          component={() => (
            auth.user
              ? <RentalsList token={token} BASE_URL={BASE_URL} />
              : <Redirect to="/login" />
          )}
        />
      </Switch>
    </Router>
  );
};

export default App;
