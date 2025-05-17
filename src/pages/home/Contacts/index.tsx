import { MapPin, Plus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ContactFilters } from './ContactFilters';
import { ContactList } from './ContactList';

export const Contacts = () => {
  const location = useLocation();
  const isCreatingContact = location.pathname === '/contacts/new';

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl text-white font-bold">Contatos</h2>
        {isCreatingContact ? (
          <Link to="/" className="border border-border  rounded-md p-2">
            <MapPin className="w-4 h-4 text-white" />
          </Link>
        ) : (
          <Link to="/contacts/new" className="border border-border  rounded-md p-2">
            <Plus className="w-4 h-4 text-white" />
          </Link>
        )}
      </div>
      <ContactFilters />
      <ContactList />
    </div>
  );
};
