import { CONTACTS_KEY, getContacts } from '../../repositories/contactsStorage';

export const removeContactService = (id: string) => {
  const contacts = getContacts();
  const filteredContacts = contacts.filter(contact => contact.id !== id);
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(filteredContacts));
};
