import type { ContactSchema } from '../pages/home/Contacts/CreateContact';

export const CONTACTS_KEY = 'contacts';

export type StoredContact = ContactSchema & {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  latitude: number;
  longitude: number;
};

export function getContacts(): StoredContact[] {
  const data = localStorage.getItem(CONTACTS_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveContacts(contacts: StoredContact[]): void {
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
}

export function addContact(contact: StoredContact): void {
  const contacts = getContacts();
  saveContacts([...contacts, contact]);
}

export function findContactById(id: string): StoredContact | undefined {
  return getContacts().find(contact => contact.id === id);
}

export function findContactsByUserId(userId: string): StoredContact[] {
  return getContacts().filter(contact => contact.userId === userId);
}
