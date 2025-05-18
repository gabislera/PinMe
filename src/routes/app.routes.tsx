import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/home';
import { HomeLayout } from '../layouts/HomeLayout';
import { CreateContact } from '../pages/home/Contacts/CreateContact';
import { SettingsLayout } from '../layouts/SettingsLayout';
import { Settings } from '../pages/settings';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/contacts/new" element={<CreateContact />} />
      </Route>
      <Route element={<SettingsLayout />}>
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
