import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/home';
import { HomeLayout } from '../layouts/HomeLayout';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}
