import { Route, Routes } from 'react-router-dom';
import { SignIn } from '../pages/auth/SignIn';
import { SignUp } from '../pages/auth/SignUp';
import { Home } from '../pages/auth/Home';
import { AuthLayout } from '../layouts/AuthLayout';

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
      </Route>
    </Routes>
  );
};
