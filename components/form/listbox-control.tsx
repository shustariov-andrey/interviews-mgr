import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import React, { Fragment } from 'react';

interface ListboxOption {
  key: string;
  label: string;
}

interface ListboxProps {
  label: string;
  options: ListboxOption[];
  onSelect: (key: string) => void;
  value: string;
}

const ListboxControl: React.FC<ListboxProps> = ({ value, label, onSelect, options }) => {
  const selected = options.find(o => o.key === value)?.key;

  return (
    <>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <Listbox value={selected} onChange={(value) => onSelect(value ?? '')}>
        <div className="relative mt-1">
          <Listbox.Button
            className="relative shadow-sm w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg border-gray-300 border cursor-default focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <span className="block truncate h-5">{selected}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map(({ key, label }) => (
                <Listbox.Option
                  key={key}
                  className={({ active }) =>
                    `cursor-default select-none relative py-2 pl-10 pr-4 ${
                      active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'
                    }`
                  }
                  value={key}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="w-5 h-5" aria-hidden="true"/>
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </>
  );
};

export default ListboxControl;
