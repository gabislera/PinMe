import { useEffect, useState } from 'react';
import { ContactCard } from './ContactCard';
import { listContactsService } from '../../../services/contacts/getContacts';
import type { StoredContact } from '../../../repositories/contactsStorage';

export const ContactList = () => {
  const [contactsList, setContactsList] = useState<StoredContact[]>([]);

  useEffect(() => {
    try {
      const contacts = listContactsService();
      setContactsList(contacts);
    } catch (error) {
      alert(error);
    }
  }, []);

  if (contactsList.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Nenhum contato cadastrado ainda</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {contactsList.map(contact => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </div>
  );
};
