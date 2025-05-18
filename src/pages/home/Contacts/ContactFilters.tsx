import { Search } from 'lucide-react';
import { Input } from '../../../components/Input';
import { Select } from '../../../components/Select';

export const ContactFilters = () => {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="flex items-center gap-2 w-full">
        <Input
          type="text"
          // variant="outlined"
          placeholder="Buscar por nome ou CPF"
          icon={<Search className="w-4 h-4 text-dragon-500 dark:text-dragon-tertiary" />}
        />
        <Select
          // variant="outlined"
          options={[
            { label: 'Nome (A-Z)', value: 'az' },
            { label: 'Nome (Z-A)', value: 'za' },
          ]}
          wrapperClassName="!w-48"
        />
      </div>
    </div>
  );
};
