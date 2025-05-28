import { findContactById, getContacts, saveContacts } from '../../repositories/contactsStorage';
import { getSession } from '../../repositories/authStorage';
import { getUserIdFromToken } from '../auth/tokenService';

export const removeContactService = (id: string) => {
  // Get current user ID
  const session = getSession();
  if (!session) {
    throw new Error('Usuário não autenticado');
  }

  const userId = getUserIdFromToken(session.token);
  if (!userId) {
    throw new Error('Sessão inválida');
  }

  // Verify if the contact belongs to the current user
  const contactToRemove = findContactById(id);
  if (!contactToRemove) {
    throw new Error('Contato não encontrado');
  }

  if (contactToRemove.userId !== userId) {
    throw new Error('Não autorizado a remover este contato');
  }

  const contacts = getContacts();
  const filteredContacts = contacts.filter(contact => contact.id !== id);
  saveContacts(filteredContacts);
};
