import { useState } from 'react';
import AccordionItem from '../ui/AccordionItem';
import { Input1 } from '../ui/Input1';
import { documentType } from '@/src/utils/dataStatic';
import CustomSelect from '../ui/CustomSelect';
import { Customer } from '@/src/schemas';
import { getLocalDate } from '@/src/utils';

type CustomerFormProps = {
    customer?: Customer
}

export default function CustomerForm({customer} : CustomerFormProps) {
  const [activeAccordion, setActiveAccordion] = useState<string | null>('1');

  const handleToggle = (id: string) => {
    setActiveAccordion(prev => (prev === id ? null : id));
  };

  const defaultDocumentTypeOption = documentType.find(
        (option) => option.value === customer?.document_type
    );

  return (
    <div className="flex flex-col gap-2 w-full mx-auto" id="accordion-color">
      <AccordionItem
        id="1"
        title="Datos Personales"
        isOpen={activeAccordion === '1'}
        onToggle={handleToggle}
      >
        <Input1 label='Nombre' name='first_name' type='text' placeholder='' inputId='first_name' defaultValue={customer?.first_name} autoComplete='off' />

        <Input1 label='Apellidos' name='last_name' type='text' placeholder='' inputId='last_name' defaultValue={customer?.last_name} autoComplete='off' />

      </AccordionItem>

      <AccordionItem
        id="2"
        title="Documento"
        isOpen={activeAccordion === '2'}
        onToggle={handleToggle}
      >

        {documentType.length > 0 && (
          <CustomSelect
            label="Tipo Documento"
            name="document_type"
            options={documentType}
            placeholder="Selecciona un servicio"
            defaultValue={defaultDocumentTypeOption}
            onChange={(selected) => console.log(selected)}
          />
        )}

        <Input1 label='Documento' name='document_number' type='text' placeholder='' inputId='document_number' defaultValue={customer?.document_number} autoComplete='off' />

      </AccordionItem>

      <AccordionItem
        id="3"
        title="Datos Adicionales"
        isOpen={activeAccordion === '3'}
        onToggle={handleToggle}
      >
        <Input1 label='Direccion' name='address' type='text' placeholder='' inputId='address' defaultValue={customer?.address} autoComplete='off' />
        <Input1 label='Ciudad' name='country' type='text' placeholder='' inputId='country' defaultValue={customer?.country} autoComplete='off' />
        <Input1 label='Correo' name='email' type='text' placeholder='' inputId='email' defaultValue={customer?.email} autoComplete='off' />
        <Input1 label='Teléfono' name='phone' type='text' placeholder='' inputId='phone' defaultValue={customer?.phone} autoComplete='off' />
        <Input1 label='Cumpleaños' name='birth_date' type='date' placeholder='' inputId='birth_date' defaultValue='' autoComplete='off' />

      </AccordionItem>
    </div>
  );
}