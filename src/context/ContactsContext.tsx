import { createContext, useEffect, useState, type ReactNode } from 'react';
import type { StoredContact } from '../repositories/contactsStorage';
import { listContactsService } from '../services/contacts/getContacts';
import { createContactService } from '../services/contacts/createContact';
import type { ContactSchema } from '../pages/home/Contacts/CreateContact';
import { removeContactService } from '../services/contacts/removeContact';

interface ContactsContextProps {
  contacts: StoredContact[];
  createContact: (data: ContactSchema) => void;
  removeContact: (id: string) => void;
}

interface ContactsProviderProps {
  children: ReactNode;
}

export const ContactsContext = createContext({} as ContactsContextProps);

export function ContactsProvider({ children }: ContactsProviderProps) {
  const [contacts, setContacts] = useState<StoredContact[]>([]);

  useEffect(() => {
    setContacts(listContactsService());
  }, []);

  const createContact = (data: ContactSchema) => {
    const newContact = createContactService(data);
    setContacts(prev => [...prev, newContact]);
  };

  const removeContact = (id: string) => {
    removeContactService(id);
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  return (
    <ContactsContext.Provider value={{ contacts, createContact, removeContact }}>
      {children}
    </ContactsContext.Provider>
  );
}
