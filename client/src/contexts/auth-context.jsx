/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, {
  useState, useContext, createContext, useEffect,
} from 'react';

let BASE_URL;
if (process.env.NODE_ENV === 'production') {
  BASE_URL = '';
} else if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:8080';
}

const authContext = createContext();

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      const foundUser = loggedInUser;
      setUser(foundUser);
    }
  }, []);

  const logout = () => {
    setUser(null);
    setError(null);
    localStorage.clear();
  };

  const autoLogout = (milliseconds) => {
    setTimeout(() => {
      logout();
    }, milliseconds);
  };

  const removeError = () => {
    setError(null);
  };

  const login = async (postData) => {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: postData.email,
        contraseña: postData.password,
      }),
    });
    const results = await res.json();

    if (!results.error) {
      localStorage.setItem('auth-token', JSON.stringify(results.accessToken));
      localStorage.setItem('user', JSON.stringify(results.userData));
      const remainingMilliseconds = 60 * 60 * 24 * 1000; // un dia en milisegundos
      const expiryDate = Date.now() + remainingMilliseconds;
      localStorage.setItem('expiryDate', JSON.stringify(expiryDate));
      autoLogout(remainingMilliseconds);
      return setUser(results.userData);
    }
    throw Error(results.error);
  };
  const signup = async (postData) => {
    const res = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: postData.email,
        nombreDeUsuario: postData.userName,
        contraseña: postData.password,
        confirmarContraseña: postData.confirmPassword,
      }),
    });
    const results = await res.json();
    if (!results.error) {
      setError(null);
      setRedirect('/login');
      return setTimeout(() => setRedirect(null), 1000);
    }
    throw Error(results.error);
  };
  return {
    user,
    error,
    redirect,
    removeError,
    login,
    signup,
    logout,
  };
}

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => useContext(authContext);

export default authContext;
