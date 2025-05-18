import { CONTACTS_KEY, type StoredContact } from '../../repositories/contactsStorage';

export type SortOrder = 'asc' | 'desc';

export interface ContactFilters {
  searchTerm?: string;
  sortOrder?: SortOrder;
}

export const listContactsService = (filters?: ContactFilters): StoredContact[] => {
  const rawContacts = localStorage.getItem(CONTACTS_KEY) || '[]';
  const contacts: StoredContact[] = JSON.parse(rawContacts);

  const { searchTerm = '', sortOrder } = filters || {};

  const cleanedSearch = searchTerm
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

  let filteredContacts = contacts;

  if (cleanedSearch) {
    filteredContacts = contacts.filter(contact => {
      const cleanedName = contact.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      const cleanedCpf = contact.cpf.replace(/\D/g, '');
      return cleanedName.includes(cleanedSearch) || cleanedCpf.includes(cleanedSearch);
    });
  }

  if (sortOrder) {
    filteredContacts = [...filteredContacts].sort((a, b) => {
      return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    });
  }

  return filteredContacts;
};
