import { MapPin, Plus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ContactFilters } from './ContactFilters';
import { ContactList } from './ContactList';

export const Contacts = () => {
  const location = useLocation();
  const isCreatingContact = location.pathname === '/contacts/new';
  const isEditingContact = location.pathname.startsWith('/contacts/edit/');
  const showMapIcon = isCreatingContact || isEditingContact;

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl text-dragon-700 dark:text-white font-bold">Contatos</h2>
        {showMapIcon ? (
          <Link to="/" className="border border-dragon-200 dark:border-dragon-800 rounded-md p-2">
            <MapPin className="w-4 h-4 text-dragon-700 dark:text-white" />
          </Link>
        ) : (
          <Link
            to="/contacts/new"
            className="border border-dragon-200 dark:border-dragon-800 rounded-md p-2"
          >
            <Plus className="w-4 h-4 text-dragon-700 dark:text-white" />
          </Link>
        )}
      </div>
      <ContactFilters />
      <ContactList />
    </div>
  );
};
