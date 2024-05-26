'use client';

import Image from 'next/image';
import React from 'react';

import { Country } from '@/api/types';

interface Props {
  onClick: () => void;
  value: Country;
}

const CountryOption = ({ value, onClick }: Props) => {
  return (
    <li
      onClick={onClick}
      className='cursor-pointer hover:bg-gray-100 p-2 rounded-lg text-sm flex align-center gap-2'
    >
      <Image
        className='object-cover h-[20px]'
        width={30}
        height={20}
        alt='country_flag'
        src={value.flag}
      />
      {value.name}
    </li>
  );
};

export default CountryOption;
