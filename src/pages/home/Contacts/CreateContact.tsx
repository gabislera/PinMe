import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { cpf } from 'cpf-cnpj-validator';

import { Input } from '../../../components/Input';
import { Select } from '../../../components/Select';
import { Button } from '../../../components/Button';
import { AddressSearch } from '../../../components/AddressSearch';
import { brazilStates } from '../../../utils/states';
import { useContacts } from '../../../hooks/useContacts';
import { useNavigate, useParams } from 'react-router-dom';
import { showToast } from '../../../utils/toast';

interface ViaCepAddress {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  numero?: string;
}

const contactFormSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  phone: z
    .string()
    .regex(/^\(?\d{2}\)?[\s.-]?\d{4,5}[\s.-]?\d{4}$/, { message: 'Telefone inválido' }),
  email: z.string().email({ message: 'Email inválido' }),
  cpf: z
    .string()
    .regex(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, { message: 'Formato de CPF inválido' })
    .refine(cpf.isValid, { message: 'CPF inválido' }),
  address: z.object({
    zipcode: z.string().regex(/^\d{5}-?\d{3}$/, { message: 'CEP inválido. Ex: 00000-000' }),
    street: z.string().min(1, { message: 'Rua é obrigatória' }),
    number: z.coerce.number().min(1, { message: 'Número é obrigatório' }),
    complement: z.string().optional(),
    neighborhood: z.string().min(1, { message: 'Bairro é obrigatório' }),
    city: z.string().min(1, { message: 'Cidade é obrigatória' }),
    state: z.string().min(1, { message: 'Estado é obrigatório' }),
  }),
});

export type ContactSchema = z.infer<typeof contactFormSchema>;

export const CreateContact = () => {
  const { id } = useParams<{ id: string }>();
  const { createContact, updateContact, contacts } = useContacts();
  const navigate = useNavigate();

  // Determine if we're in edit mode
  const isEditMode = !!id;
  const contactToEdit = isEditMode ? contacts.find(contact => contact.id === id) : null;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur',
    defaultValues: contactToEdit
      ? {
          name: contactToEdit.name,
          phone: contactToEdit.phone,
          email: contactToEdit.email,
          cpf: contactToEdit.cpf,
          address: contactToEdit.address,
        }
      : undefined,
  });

  const [isLoadingCep, setIsLoadingCep] = useState(false);

  const zipcode = watch('address.zipcode');

  // Redirect if editing and contact not found
  useEffect(() => {
    if (isEditMode && !contactToEdit) {
      showToast('Contato não encontrado', { type: 'error' });
      navigate('/home');
    }
  }, [contactToEdit, isEditMode, navigate]);

  useEffect(() => {
    const cleanCep = zipcode?.replace(/\D/g, '');

    if (cleanCep?.length !== 8) return;

    const fetchAddress = async () => {
      setIsLoadingCep(true);

      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await response.json();

        if (data.erro) {
          setError('address.zipcode', {
            type: 'manual',
            message: 'CEP não encontrado',
          });
          throw new Error('CEP não encontrado');
        }

        setValue('address.street', data.logradouro || '');
        setValue('address.neighborhood', data.bairro || '');
        setValue('address.city', data.localidade || '');
        setValue('address.state', data.uf || '');
      } catch {
        showToast('Erro ao buscar o CEP', { type: 'error' });
      } finally {
        setIsLoadingCep(false);
      }
    };

    fetchAddress();
  }, [zipcode, setValue, setError]);

  const handleSelectAddress = (address: ViaCepAddress) => {
    setValue('address.zipcode', address.cep, { shouldValidate: true });
    setValue('address.street', address.logradouro, { shouldValidate: true });
    setValue('address.neighborhood', address.bairro, { shouldValidate: true });
    setValue('address.city', address.localidade, { shouldValidate: true });
    setValue('address.state', address.uf, { shouldValidate: true });
    // Focus on the number input since it still needs to be filled
    document.getElementById('address-number')?.focus();
  };

  const onSubmit = async (data: ContactSchema) => {
    try {
      if (isEditMode && id) {
        await updateContact(id, data);
        showToast('Contato atualizado com sucesso', { type: 'success' });
      } else {
        await createContact(data);
        showToast('Contato criado com sucesso', { type: 'success' });
      }
      navigate('/home');
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message, { type: 'error' });
      } else {
        showToast(`Erro ao ${isEditMode ? 'atualizar' : 'criar'} contato`, { type: 'error' });
      }
    }
  };

  return (
    <div className="h-full">
      <h2 className="text-2xl text-dragon-700 dark:text-white font-bold mb-4">
        {isEditMode ? 'Editar contato' : 'Novo contato'}
      </h2>
      <div className="w-full rounded-lg border border-dragon-200 dark:border-dragon-800 bg-white dark:bg-dragon-800 p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <h2 className="lg:col-span-2 text-dragon-700 dark:text-white font-semibold text-lg">
              Informações do contato
            </h2>

            <Input
              label="Nome"
              variant="outlined"
              placeholder="Seu nome"
              {...register('name')}
              error={errors.name}
            />

            <Input
              label="Telefone *"
              variant="outlined"
              placeholder="(00) 00000-0000"
              {...register('phone')}
              error={errors.phone}
            />

            <Input
              label="Email *"
              variant="outlined"
              placeholder="exemplo@email.com"
              {...register('email')}
              error={errors.email}
            />

            <Input
              label="CPF *"
              variant="outlined"
              placeholder="000.000.000-00"
              {...register('cpf')}
              error={errors.cpf}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <h2 className="lg:col-span-2 text-dragon-700 dark:text-white font-semibold text-lg">
              Endereço
            </h2>

            <div className="lg:col-span-2">
              <AddressSearch
                label="Buscar endereço"
                placeholder="Digite UF, cidade e rua (exemplo: SP, São Paulo, Avenida Paulista)"
                onSelectAddress={handleSelectAddress}
              />
            </div>

            <Input
              label="CEP *"
              variant="outlined"
              placeholder="00000-000"
              {...register('address.zipcode')}
              error={errors.address?.zipcode}
            />

            <Input
              label="Rua *"
              variant="outlined"
              placeholder="Rua Exemplo"
              {...register('address.street')}
              error={errors.address?.street}
              disabled={isLoadingCep}
            />

            <Input
              label="Número *"
              variant="outlined"
              placeholder="123"
              type="number"
              id="address-number"
              {...register('address.number')}
              error={errors.address?.number}
            />

            <Input
              label="Complemento"
              variant="outlined"
              placeholder="Apt 709"
              {...register('address.complement')}
              error={errors.address?.complement}
            />

            <Input
              label="Bairro *"
              variant="outlined"
              placeholder="Centro"
              {...register('address.neighborhood')}
              error={errors.address?.neighborhood}
              disabled={isLoadingCep}
            />

            <Input
              label="Cidade *"
              variant="outlined"
              placeholder="Cidade Exemplo"
              {...register('address.city')}
              error={errors.address?.city}
              disabled={isLoadingCep}
            />

            <Select
              label="Estado *"
              variant="outlined"
              options={brazilStates}
              {...register('address.state')}
              error={errors.address?.state}
              disabled={isLoadingCep}
            />
          </div>

          <div className="flex justify-end">
            <Button
              className="w-48 py-2"
              title={
                isSubmitting
                  ? isEditMode
                    ? 'Salvando contato...'
                    : 'Criando contato...'
                  : isEditMode
                    ? 'Salvar contato'
                    : 'Criar contato'
              }
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
