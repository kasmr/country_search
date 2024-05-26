'use client';

import Image from 'next/image';
import React from 'react';

import { Country as CountryType } from '@/api/types';

interface Props {
  country: CountryType;
}

const Country = ({ country }: Props) => {
  return (
    <div className='mt-1 p-4 bg-gradient-to-tr from-slate-200 to-blue-200 rounded-lg shadow-md'>
      <div className='flex justify-between flex-wrap'>
        <h2 className='text-xxl font-bold'>{country.name}</h2>
        <Image
          className='object-cover h-[36px]'
          width={54}
          height={36}
          alt='country_flag'
          src={country.flag}
        />
      </div>

      {country.capital && (
        <p>
          Capital: <b>{country.capital}</b>
        </p>
      )}
      <p>Latitude: {country.latlng[0]}</p>
      <p>Longitude: {country.latlng[1]}</p>
    </div>
  );
};

export default Country;
