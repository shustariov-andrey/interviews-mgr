import React from 'react';

interface InputControlProps {
  name: string;
  id?: string;
  label?: string;
  onInput: (text: string) => void;
  value: string;
  autoComplete?: string;
  type?: string;
}

const InputControl: React.FC<InputControlProps> = ({value, name, type, id, label, autoComplete, onInput}) => {
  return (
    <>
      {label &&
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      }
      <input
        type={type ?? 'text'}
        name={name}
        id={id ?? name}
        value={value}
        onInput={(ev) => onInput((ev.target as HTMLInputElement).value)}
        autoComplete={autoComplete ?? 'off'}
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      />
    </>
  );
}

export default InputControl;
