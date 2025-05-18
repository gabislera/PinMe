import { CONTACTS_KEY, type StoredContact } from '../../repositories/contactsStorage';

export const listContactsService = (): StoredContact[] => {
  const contacts = localStorage.getItem(CONTACTS_KEY);
  return contacts ? JSON.parse(contacts) : [];
};
