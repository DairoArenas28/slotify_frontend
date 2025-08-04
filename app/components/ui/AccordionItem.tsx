interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  id: string;
  isOpen: boolean;
  onToggle: (id: string) => void;
}
export default function AccordionItem({ title, children, id, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border border-gray-200 rounded-md overflow-hidden shadow-sm">
      <h2 id={`accordion-heading-${id}`}>
        <button
          type="button"
          className={`flex items-center justify-between w-full px-6 py-4 font-semibold text-white ${
            isOpen ? 'bg-[#C08081]' : 'bg-[#1A1E29] hover:bg-[#2D3141]'
          } transition-colors duration-300`}
          onClick={() => onToggle(id)}
          aria-expanded={isOpen}
          aria-controls={`accordion-body-${id}`}
        >
          <span>{title}</span>
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </h2>
      <div
        id={`accordion-body-${id}`}
        aria-labelledby={`accordion-heading-${id}`}
        className={`bg-white px-6 text-gray-700 transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[500px] py-4' : 'max-h-0 py-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
}