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
import { updateContactService } from '../services/contacts/updateContact';
import { useAuth } from '../hooks/useAuth';

interface ContactsContextProps {
  contacts: StoredContact[];
  createContact: (data: ContactSchema) => Promise<StoredContact>;
  updateContact: (id: string, data: ContactSchema) => Promise<StoredContact>;
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

export const ContactsContext = createContext<ContactsContextProps | null>(null);

export function ContactsProvider({ children }: ContactsProviderProps) {
  const [contacts, setContacts] = useState<StoredContact[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [selectedContact, setSelectedContact] = useState<StoredContact | null>(null);
  const { getUserData } = useAuth();
  const user = getUserData();
  const userId = user?.id;

  useEffect(() => {
    if (!userId) {
      setContacts([]);
      return;
    }
    const filters: ContactFilters = {
      searchTerm: searchTerm || undefined,
      sortOrder,
    };
    setContacts(listContactsService(filters));
  }, [searchTerm, sortOrder, userId]);

  const createContact = async (data: ContactSchema): Promise<StoredContact> => {
    const newContact = await createContactService(data);

    const filters: ContactFilters = {
      searchTerm: searchTerm || undefined,
      sortOrder,
    };
    setContacts(listContactsService(filters));

    return newContact;
  };

  const updateContact = async (id: string, data: ContactSchema): Promise<StoredContact> => {
    const updatedContact = await updateContactService(id, data);

    const filters: ContactFilters = {
      searchTerm: searchTerm || undefined,
      sortOrder,
    };
    setContacts(listContactsService(filters));

    return updatedContact;
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
        updateContact,
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
