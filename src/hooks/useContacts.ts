import { useContext } from 'react';
import { ContactsContext } from '../context/ContactsContext.tsx';

export const useContacts = () => {
  const context = useContext(ContactsContext);

  if (!context) {
    throw new Error('useContacts deve ser usado dentro de um ContactsProvider');
  }

  return context;
};
