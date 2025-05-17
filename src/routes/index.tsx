import { BrowserRouter } from 'react-router-dom';
import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export function Routes() {
  const { isAuthenticated } = useContext(AuthContext);

  return <BrowserRouter>{isAuthenticated ? <AppRoutes /> : <AuthRoutes />}</BrowserRouter>;
}
