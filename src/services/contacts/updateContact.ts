import type { ContactSchema } from '../../pages/home/Contacts/CreateContact';
import {
  findContactById,
  findContactsByUserId,
  getContacts,
  saveContacts,
  type StoredContact,
} from '../../repositories/contactsStorage';
import { getSession } from '../../repositories/authStorage';
import { getUserIdFromToken } from '../auth/tokenService';
import { getGeoCodeAddress } from '../../utils/getGeoCodeAddress';

export const updateContactService = async (
  id: string,
  contact: ContactSchema
): Promise<StoredContact> => {
  // Get current user ID
  const session = getSession();
  if (!session) {
    throw new Error('Usuário não autenticado');
  }

  const userId = getUserIdFromToken(session.token);
  if (!userId) {
    throw new Error('Sessão inválida');
  }

  const contactToUpdate = findContactById(id);
  if (!contactToUpdate) {
    throw new Error('Contato não encontrado');
  }

  if (contactToUpdate.userId !== userId) {
    throw new Error('Não autorizado a editar este contato');
  }

  // Check if CPF or email is already in use by another contact
  const userContacts = findContactsByUserId(userId);
  const otherContacts = userContacts.filter(c => c.id !== id);

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
  const contacts = getContacts();
  const updatedContacts = contacts.map(c => (c.id === id ? updatedContact : c));
  saveContacts(updatedContacts);

  return updatedContact;
};
