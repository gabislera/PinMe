import type { ContactSchema } from '../../pages/home/Contacts/CreateContact';
import { getContacts, saveContact, type StoredContact } from '../../repositories/contactsStorage';
import { getCurrentUser, getUserIdFromToken } from '../../repositories/authStorage';
import { getGeoCodeAddress } from '../../utils/getGeoCodeAddress';

export const createContactService = async (contact: ContactSchema) => {
  // Get current user ID
  const session = getCurrentUser();
  if (!session) {
    throw new Error('Usuário não autenticado');
  }

  const userId = getUserIdFromToken(session.token);
  if (!userId) {
    throw new Error('Sessão inválida');
  }

  const userContacts = getContacts().filter(contact => contact.userId === userId);

  if (userContacts.some(existingContact => existingContact.cpf === contact.cpf)) {
    throw new Error('CPF já cadastrado');
  }

  if (userContacts.some(existingContact => existingContact.email === contact.email)) {
    throw new Error('Email já cadastrado');
  }

  const { lat, lng } = await getGeoCodeAddress(contact.address);

  const newContact: StoredContact = {
    ...contact,
    id: crypto.randomUUID(),
    userId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    latitude: lat,
    longitude: lng,
  };

  saveContact(newContact);

  return newContact;
};
