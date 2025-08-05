import { useState } from 'react';
import AccordionItem from '../ui/AccordionItem';


export default function CustomerForm() {
  const [activeAccordion, setActiveAccordion] = useState<string | null>('1');

  const handleToggle = (id: string) => {
    setActiveAccordion(prev => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col gap-2 w-full mx-auto" id="accordion-color">
      <AccordionItem
        id="1"
        title="Datos Personales"
        isOpen={activeAccordion === '1'}
        onToggle={handleToggle}
      >
        <div className="mb-5">
          <label htmlFor="first_name" className="text-sm uppercase font-bold">Nombre</label>
          <input id="first_name" name="first_name" className="w-full p-3 border border-gray-100 bg-white" placeholder="Nombre" />
        </div>
        <div className="mb-5">
          <label htmlFor="last_name" className="text-sm uppercase font-bold">Apellido</label>
          <input id="last_name" name="last_name" className="w-full p-3 border border-gray-100 bg-white" placeholder="Apellido" />
        </div>
      </AccordionItem>

      <AccordionItem
        id="2"
        title="Documento"
        isOpen={activeAccordion === '2'}
        onToggle={handleToggle}
      >

        <div className="flex flex-col gap-2">
          <label className="font-bold text-2xl" htmlFor="serviceId">Tipo Documento</label>
          <select
            id="document_type"
            name="document_type"
            className="w-full border border-gray-300 p-3 rounded-lg"
          >
            <option value="0">Selecciona tipo de documento</option>
            <option value="1">Cédula de Ciudadanía</option>
            <option value="2">Tarjeta de Identidad</option>
            <option value="99">Otro</option>
          </select>
        </div>

        <div className="mb-5">
          <label htmlFor="document_number" className="text-sm uppercase font-bold">Documento</label>
          <input id="document_number" name="document_number" className="w-full p-3 border border-gray-100 bg-white" placeholder="Documento" />
        </div>


      </AccordionItem>

      <AccordionItem
        id="3"
        title="Datos Adicionales"
        isOpen={activeAccordion === '3'}
        onToggle={handleToggle}
      >
        <div className="mb-5">
          <label htmlFor="address" className="text-sm uppercase font-bold">Direccion</label>
          <input id="address" name="address" type="text" className="w-full p-3 border border-gray-100 bg-white" placeholder="" />
        </div>
        <div className="mb-5">
          <label htmlFor="country" className="text-sm uppercase font-bold">Ciudad</label>
          <input id="country" name="country" type="text" className="w-full p-3 border border-gray-100 bg-white" placeholder="" />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="text-sm uppercase font-bold">Correo</label>
          <input id="email" name="email" type="text" className="w-full p-3 border border-gray-100 bg-white" placeholder="" />
        </div>
        <div className="mb-5">
          <label htmlFor="phone" className="text-sm uppercase font-bold">Telefono</label>
          <input id="phone" name="phone" type="text" className="w-full p-3 border border-gray-100 bg-white" placeholder="" />
        </div>
        <div className="mb-5">
          <label htmlFor="birth_date" className="text-sm uppercase font-bold">Cumpleaños</label>
          <input id="birth_date" name="birth_date" type="date" className="w-full p-3 border border-gray-100 bg-white" placeholder="" />
        </div>
      </AccordionItem>
    </div>
  );
}