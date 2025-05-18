import { MapPin, Pencil, Phone, Trash } from 'lucide-react';

interface ContactCardProps {
  contact: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    cpf: string;
  };
}

export const ContactCard = ({ contact }: ContactCardProps) => {
  return (
    <div
      key={contact.id}
      className="bg-white dark:bg-dragon-800 border border-dragon-200 dark:border-dragon-800 rounded-lg p-4"
    >
      <div className="flex items-start gap-4">
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-dragon-700 dark:text-white">{contact.name}</h3>
            <div className="flex gap-1">
              <button className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-dragon-100/50 dark:hover:bg-dragon-700">
                <Pencil className="w-4 h-4 text-dragon-700 dark:text-white" />
                <span className="sr-only">Editar</span>
              </button>
              <button className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-dragon-100/50 dark:hover:bg-dragon-700 text-red-500">
                <Trash className="w-4 h-4 text-red-500" />
                <span className="sr-only">Excluir</span>
              </button>
            </div>
          </div>

          <p className="text-sm text-dragon-500 dark:text-dragon-300">{contact.email}</p>
          <div className="flex items-center text-sm text-dragon-500 dark:text-dragon-300">
            <Phone className="w-4 h-4" />
            {contact.phone}
          </div>
          <div className="flex items-center text-sm text-dragon-500 dark:text-dragon-300">
            <MapPin className="w-4 h-4" />
            {contact.address}
          </div>
          <div className="text-sm text-dragon-500 dark:text-dragon-300 mt-1">
            <span className="font-medium">CPF:</span> {contact.cpf}
          </div>
        </div>
      </div>
    </div>
  );
};
