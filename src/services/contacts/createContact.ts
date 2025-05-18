import type { ContactSchema } from '../../pages/home/Contacts/CreateContact';
import { getContacts, saveContact, type StoredContact } from '../../repositories/contactsStorage';

export const createContactService = (contact: ContactSchema) => {
  if (getContacts().some(existingContact => existingContact.cpf === contact.cpf)) {
    throw new Error('CPF já cadastrado');
  }

  if (getContacts().some(existingContact => existingContact.email === contact.email)) {
    throw new Error('Email já cadastrado');
  }

  const newContact: StoredContact = {
    ...contact,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  saveContact(newContact);
};
