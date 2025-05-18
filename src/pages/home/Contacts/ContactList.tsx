import { ContactCard } from './ContactCard';
import { useContacts } from '../../../hooks/useContacts';
// components/ContactList.tsx

export const ContactList = () => {
  const { contacts, selectedContact, setSelectedContact } = useContacts();

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
        <ContactCard
          key={contact.id}
          contact={contact}
          isSelected={selectedContact?.id === contact.id}
          onClick={() => setSelectedContact(contact)}
        />
      ))}
    </div>
  );
};
