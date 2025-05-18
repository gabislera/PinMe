import React, { useState, useEffect, useRef } from 'react';
import { Input } from './Input';

interface Address {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  numero?: string;
}

interface AddressSearchProps {
  onSelectAddress: (address: Address) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

export const AddressSearch = ({
  onSelectAddress,
  label = 'Buscar endereço',
  placeholder = 'Digite UF, cidade ou rua para buscar',
  className,
}: AddressSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchTerm.length < 3) {
      setAddresses([]);
      return;
    }

    const searchAddress = async () => {
      setIsLoading(true);
      try {
        // Check if it's a CEP
        if (/^\d{5}-?\d{3}$/.test(searchTerm)) {
          const cleanCep = searchTerm.replace(/\D/g, '');
          const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
          const data = await response.json();

          if (!data.erro) {
            setAddresses([data]);
          } else {
            setAddresses([]);
          }
        } else {
          // Try to search by UF, city, and street
          const parts = searchTerm.split(',').map(part => part.trim());

          if (parts.length >= 2) {
            const uf = parts[0].length === 2 ? parts[0].toUpperCase() : '';
            const cidade = uf ? parts[1] : parts[0];
            const logradouro = parts.length >= 3 ? parts[2] : parts[1];

            if ((uf || cidade) && logradouro && logradouro.length >= 3) {
              const response = await fetch(
                `https://viacep.com.br/ws/${uf || 'SP'}/${cidade}/${logradouro}/json/`
              );
              const data = await response.json();

              if (Array.isArray(data)) {
                setAddresses(data);
              } else {
                setAddresses([]);
              }
            }
          }
        }
      } catch (error) {
        console.error('Error fetching addresses:', error);
        setAddresses([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(searchAddress, 500);
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleSelectAddress = (address: Address) => {
    onSelectAddress(address);
    setIsDropdownOpen(false);
    // Clear the search term after selection
    setSearchTerm('');
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <Input
        label={label}
        variant="outlined"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => addresses.length > 0 && setIsDropdownOpen(true)}
      />

      {isLoading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-dragon-primary"></div>
        </div>
      )}

      {isDropdownOpen && addresses.length > 0 && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white dark:bg-dragon-800 shadow-lg max-h-60 overflow-auto border border-dragon-200 dark:border-dragon-700">
          <ul className="py-1">
            {addresses.map((address, index) => (
              <li
                key={`${address.cep}-${index}`}
                className="px-4 py-2 text-sm text-dragon-700 dark:text-dragon-tertiary hover:bg-dragon-100 dark:hover:bg-dragon-700 cursor-pointer"
                onClick={() => handleSelectAddress(address)}
              >
                {address.logradouro}, {address.bairro}, {address.localidade} - {address.uf},{' '}
                {address.cep}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="text-xs text-dragon-500 dark:text-dragon-400 mt-1">
        Digite UF, cidade e logradouro separados por vírgula (exemplo: SP, São Paulo, Avenida
        Paulista) ou um CEP
      </div>
    </div>
  );
};
