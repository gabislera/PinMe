import { MapPin, Pencil, Phone, Trash } from 'lucide-react';
import type { StoredContact } from '../../../repositories/contactsStorage';
import { useContacts } from '../../../hooks/useContacts';
import { Button } from '../../../components/Button';

export const ContactCard = ({
  contact,
  onClick,
  isSelected,
}: {
  contact: StoredContact;
  onClick: () => void;
  isSelected: boolean;
}) => {
  const { removeContact } = useContacts();
  return (
    <div
      key={contact.id}
      className={`bg-white dark:bg-dragon-800 border border-dragon-200 dark:border-dragon-800 rounded-lg p-4 cursor-pointer ${
        isSelected ? 'border-dragon-500 dark:border-dragon-500' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-dragon-700 dark:text-white">{contact.name}</h3>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm">
                <Pencil className="w-4 h-4 text-dragon-700 dark:text-white hover:text-dragon-600 dark:hover:text-dragon-300" />
                <span className="sr-only">Editar</span>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => removeContact(contact.id)}>
                <Trash className="w-4 h-4 text-red-500 hover:text-red-600" />
                <span className="sr-only">Excluir</span>
              </Button>
            </div>
          </div>

          <p className="text-sm text-dragon-500 dark:text-dragon-300">{contact.email}</p>
          <div className="flex items-center text-sm text-dragon-500 dark:text-dragon-300">
            <Phone className="w-4 h-4" />
            {contact.phone}
          </div>
          <div className="flex items-center text-sm text-dragon-500 dark:text-dragon-300">
            <MapPin className="w-4 h-4" />
            {`${contact.address.street}, ${contact.address.number} - ${contact.address.neighborhood}, ${contact.address.city} - ${contact.address.state}`}
          </div>
          <div className="text-sm text-dragon-500 dark:text-dragon-300 mt-1">
            <span className="font-medium">CPF:</span> {contact.cpf}
          </div>
        </div>
      </div>
    </div>
  );
};
