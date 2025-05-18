import type { ContactSchema } from '../pages/home/Contacts/CreateContact';

export const CONTACTS_KEY = 'contacts';

export type StoredContact = ContactSchema & {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export function getContacts(): StoredContact[] {
  const data = localStorage.getItem(CONTACTS_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveContact(contact: StoredContact): void {
  const contacts = getContacts();
  localStorage.setItem(CONTACTS_KEY, JSON.stringify([...contacts, contact]));
}
