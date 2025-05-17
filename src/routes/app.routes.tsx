import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/home';
import { HomeLayout } from '../layouts/HomeLayout';
import { CreateContact } from '../pages/home/Contacts/CreateContact';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/contacts/new" element={<CreateContact />} />
      </Route>
    </Routes>
  );
}
