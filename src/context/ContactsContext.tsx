import { createContext, useEffect, useState, type ReactNode } from 'react';
import type { StoredContact } from '../repositories/contactsStorage';
import {
  listContactsService,
  type ContactFilters,
  type SortOrder,
} from '../services/contacts/getContacts';
import { createContactService } from '../services/contacts/createContact';
import type { ContactSchema } from '../pages/home/Contacts/CreateContact';
import { removeContactService } from '../services/contacts/removeContact';

interface ContactsContextProps {
  contacts: StoredContact[];
  createContact: (data: ContactSchema) => void;
  removeContact: (id: string) => void;
  searchTerm: string;
  setSearchTerm: (text: string) => void;
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
  selectedContact: StoredContact | null;
  setSelectedContact: (contact: StoredContact | null) => void;
}

interface ContactsProviderProps {
  children: ReactNode;
}

export const ContactsContext = createContext({} as ContactsContextProps);

export function ContactsProvider({ children }: ContactsProviderProps) {
  const [contacts, setContacts] = useState<StoredContact[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [selectedContact, setSelectedContact] = useState<StoredContact | null>(null);

  useEffect(() => {
    const filters: ContactFilters = {
      searchTerm: searchTerm || undefined,
      sortOrder,
    };
    setContacts(listContactsService(filters));
  }, [searchTerm, sortOrder]);

  const createContact = async (data: ContactSchema) => {
    await createContactService(data);

    const filters: ContactFilters = {
      searchTerm: searchTerm || undefined,
      sortOrder,
    };
    setContacts(listContactsService(filters));
  };

  const removeContact = (id: string) => {
    removeContactService(id);

    const filters: ContactFilters = {
      searchTerm: '',
      sortOrder,
    };
    setSearchTerm('');
    setContacts(listContactsService(filters));
  };

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        createContact,
        removeContact,
        searchTerm,
        setSearchTerm,
        sortOrder,
        setSortOrder,
        selectedContact,
        setSelectedContact,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
}
