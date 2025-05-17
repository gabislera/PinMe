import { ContactCard } from './ContactCard';

const initialContacts = [
  {
    id: '1',
    name: 'Ana Silva',
    email: 'ana.silva@email.com',
    phone: '(11) 98765-4321',
    address: 'Av. Paulista, 1000, São Paulo - SP',
    cpf: '123.456.789-00',
  },
  {
    id: '2',
    name: 'Carlos Oliveira',
    email: 'carlos.oliveira@email.com',
    phone: '(21) 99876-5432',
    address: 'Rua Copacabana, 500, Rio de Janeiro - RJ',
    cpf: '987.654.321-00',
  },
  {
    id: '3',
    name: 'Mariana Santos',
    email: 'mariana.santos@email.com',
    phone: '(31) 97654-3210',
    address: 'Av. Afonso Pena, 2000, Belo Horizonte - MG',
    cpf: '456.789.123-00',
  },
  {
    id: '4',
    name: 'Bruno Costa',
    email: 'bruno.costa@email.com',
    phone: '(41) 98765-1234',
    address: 'Rua XV de Novembro, 100, Curitiba - PR',
    cpf: '789.123.456-00',
  },
  {
    id: '5',
    name: 'Daniela Lima',
    email: 'daniela.lima@email.com',
    phone: '(51) 99876-5432',
    address: 'Av. Ipiranga, 1500, Porto Alegre - RS',
    cpf: '321.654.987-00',
  },
];

export const ContactList = () => {
  return (
    <div className="space-y-4">
      {initialContacts.map(contact => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </div>
  );
};
