'use client';

import React from 'react';
import Select, { SingleValue, Props as SelectProps } from 'react-select';

type Option = {
    value: string | number;
    label: string;
};

type CustomSelectProps = {
    label: string;
    name: string;
    options: Option[];
    placeholder?: string;
    onChange?: (option: SingleValue<Option>) => void;
    inputId?: string;
    defaultValue?: Option;
} & Partial<Pick<SelectProps<Option>, "isDisabled" | "isSearchable">>;

export default function CustomSelect({
    label,
    name,
    options,
    placeholder = 'Selecciona una opción',
    onChange,
    inputId,
    defaultValue,
    isDisabled = false,
    isSearchable = true,
}: CustomSelectProps) {
    return (
        <div className="relative flex flex-col gap-2 overflow-visible z-10">
            {label ? (
                <label className="font-bold text-2xl" htmlFor={inputId ?? name}>
                    {label}
                </label>
            ) : ""}

            <Select
                inputId={inputId ?? name}
                name={name}
                options={options}
                placeholder={placeholder}
                onChange={onChange}
                defaultValue={defaultValue}
                isDisabled={isDisabled}
                isSearchable={isSearchable}
                className="w-full"
                menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                styles={{
                    control: (base) => ({
                        ...base,
                        borderColor: '#d1d5db',
                        padding: '0.25rem 0.30rem',
                        borderRadius: '0.5rem',
                        boxShadow: 'none',
                        minHeight: '3rem',
                    }),
                    placeholder: (base) => ({
                        ...base,
                        color: '#9ca3af',
                    }),

                    menuPortal: (base) => ({
                        ...base,
                        zIndex: 9999, // o más alto si tienes modales
                    }),
                }}
            />
        </div>
    );
}
