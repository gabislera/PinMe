import { Search } from 'lucide-react';
import { type ChangeEvent } from 'react';
import { Input } from '../../../components/Input';
import { Select } from '../../../components/Select';
import type { SortOrder } from '../../../services/contacts/getContacts';
import { useContacts } from '../../../hooks/useContacts';

export const ContactFilters = () => {
  const { searchTerm, setSearchTerm, sortOrder, setSortOrder } = useContacts();

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value as SortOrder);
  };

  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="flex items-center gap-2 w-full">
        <Input
          type="text"
          placeholder="Buscar por nome ou CPF"
          icon={<Search className="w-4 h-4 text-dragon-500 dark:text-dragon-tertiary" />}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <Select
          options={[
            { label: 'Nome (A-Z)', value: 'asc' },
            { label: 'Nome (Z-A)', value: 'desc' },
          ]}
          wrapperClassName="!w-48"
          value={sortOrder}
          onChange={handleSortChange}
        />
      </div>
    </div>
  );
};
