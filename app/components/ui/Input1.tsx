
type Input1Props = {
    label: string;
    name: string;
    type: string;
    placeholder?: string;
    inputId?: string;
    defaultValue?: string;
    autoComplete?: string;
}

export function Input1({
    label,
    name,
    type,
    placeholder,
    inputId,
    defaultValue,
    autoComplete
}: Input1Props) {
    return (
        <div className="mb-5">
            <label htmlFor={inputId ?? name} className="text-sm uppercase font-bold">{label}</label>
            <input id={inputId ?? name} autoComplete={autoComplete} defaultValue={defaultValue} name={name} type={type} className="w-full p-3 border border-[#d1d5db] bg-white rounded-lg" placeholder={placeholder} />
        </div>
    )
}