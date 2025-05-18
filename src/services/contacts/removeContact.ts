import { CONTACTS_KEY, getContacts } from '../../repositories/contactsStorage';
// import { getCurrentUser, getUserIdFromToken } from '../../repositories/authStorage';

export const removeContactService = (id: string) => {
  // Get current user ID
  // const session = getCurrentUser();
  // if (!session) {
  //   throw new Error('Usuário não autenticado');
  // }

  // const userId = getUserIdFromToken(session.token);
  // if (!userId) {
  //   throw new Error('Sessão inválida');
  // }

  const contacts = getContacts();

  // Verify if the contact belongs to the current user
  // const contactToRemove = contacts.find(contact => contact.id === id);
  // if (!contactToRemove) {
  //   throw new Error('Contato não encontrado');
  // }

  // if (contactToRemove.userId !== userId) {
  //   throw new Error('Não autorizado a remover este contato');
  // }

  const filteredContacts = contacts.filter(contact => contact.id !== id);
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(filteredContacts));
};
