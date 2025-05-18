import type { ContactSchema } from '../../pages/home/Contacts/CreateContact';
import { CONTACTS_KEY, getContacts, type StoredContact } from '../../repositories/contactsStorage';
import { getCurrentUser, getUserIdFromToken } from '../../repositories/authStorage';
import { getGeoCodeAddress } from '../../utils/getGeoCodeAddress';

export const updateContactService = async (
  id: string,
  contact: ContactSchema
): Promise<StoredContact> => {
  // Get current user ID
  const session = getCurrentUser();
  if (!session) {
    throw new Error('Usuário não autenticado');
  }

  const userId = getUserIdFromToken(session.token);
  if (!userId) {
    throw new Error('Sessão inválida');
  }

  const contacts = getContacts();
  const contactToUpdate = contacts.find(c => c.id === id);

  if (!contactToUpdate) {
    throw new Error('Contato não encontrado');
  }

  if (contactToUpdate.userId !== userId) {
    throw new Error('Não autorizado a editar este contato');
  }

  // Check if CPF or email is already in use by another contact
  const otherContacts = contacts.filter(c => c.id !== id && c.userId === userId);
  if (otherContacts.some(existingContact => existingContact.cpf === contact.cpf)) {
    throw new Error('CPF já cadastrado');
  }

  if (otherContacts.some(existingContact => existingContact.email === contact.email)) {
    throw new Error('Email já cadastrado');
  }

  // Get geocode information
  const { lat, lng } = await getGeoCodeAddress(contact.address);

  // Create updated contact
  const updatedContact: StoredContact = {
    ...contactToUpdate,
    ...contact,
    updatedAt: new Date().toISOString(),
    latitude: lat,
    longitude: lng,
  };

  // Update contact in storage
  const updatedContacts = contacts.map(c => (c.id === id ? updatedContact : c));
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(updatedContacts));

  return updatedContact;
};
