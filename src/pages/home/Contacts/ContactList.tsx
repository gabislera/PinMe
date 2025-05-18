import { ContactCard } from './ContactCard';
import { useContacts } from '../../../hooks/useContacts';

export const ContactList = () => {
  const { contacts } = useContacts();

  if (contacts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Nenhum contato cadastrado ainda</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {contacts.map(contact => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </div>
  );
};
