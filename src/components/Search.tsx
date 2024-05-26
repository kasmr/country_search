'use client';

import React, { ChangeEvent, useRef } from 'react';
import { LuX } from 'react-icons/lu';

interface Props {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

const Search = ({ value, onChange, onClear }: Props) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className='relative w-full'>
      <input
        ref={inputRef}
        value={value}
        onChange={onChange}
        autoFocus
        type='text'
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 relative z-1'
        placeholder='Search country...'
        onBlur={(e) => {
          if (e.relatedTarget?.contains(buttonRef.current)) {
            e.target.focus();
          }
        }}
      />

      {Boolean(value) && (
        <button
          type='button'
          ref={buttonRef}
          className='absolute inset-y-0 end-0 flex items-center pe-3 text-gray-500 hover:opacity-75'
          onClick={onClear}
        >
          <LuX size={24} />
        </button>
      )}
    </div>
  );
};

export default Search;
