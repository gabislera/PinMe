import { findContactsByUserId, type StoredContact } from '../../repositories/contactsStorage';
import { getSession } from '../../repositories/authStorage';
import { getUserIdFromToken } from '../auth/tokenService';

export type SortOrder = 'asc' | 'desc';

export interface ContactFilters {
  searchTerm?: string;
  sortOrder?: SortOrder;
}

export const listContactsService = (filters?: ContactFilters): StoredContact[] => {
  const session = getSession();
  if (!session) return [];

  const userId = getUserIdFromToken(session.token);
  if (!userId) return [];

  let filteredContacts = findContactsByUserId(userId);

  const { searchTerm = '', sortOrder } = filters || {};

  const cleanedSearch = searchTerm
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

  if (cleanedSearch) {
    filteredContacts = filteredContacts.filter(contact => {
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
