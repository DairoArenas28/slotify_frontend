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
          <label htmlFor="name" className="text-sm uppercase font-bold">Nombre</label>
          <input id="name" name="name" className="w-full p-3 border border-gray-100 bg-white" placeholder="Nombre" />
        </div>
        <div className="mb-5">
          <label htmlFor="last_name" className="text-sm uppercase font-bold">Apellido</label>
          <input id="last_name" name="last_name" className="w-full p-3 border border-gray-100 bg-white" placeholder="Apellido" />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="text-sm uppercase font-bold">Correo</label>
          <input id="email" name="email" className="w-full p-3 border border-gray-100 bg-white" placeholder="Email" />
        </div>
      </AccordionItem>

      <AccordionItem
        id="2"
        title="Documento"
        isOpen={activeAccordion === '2'}
        onToggle={handleToggle}
      >
        <p className="text-gray-700">Aquí van tipo y número de documento.</p>
      </AccordionItem>

      <AccordionItem
        id="3"
        title="Dirección"
        isOpen={activeAccordion === '3'}
        onToggle={handleToggle}
      >
        <p className="text-gray-700">Ciudad, dirección exacta, etc.</p>
      </AccordionItem>
    </div>
  );
}