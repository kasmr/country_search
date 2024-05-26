'use client';

import { useSearchParams } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';

import Country from '@/components/Country';
import CountryOption from '@/components/CountryOption';
import Search from '@/components/Search';

import { fetchCountries } from '@/api/fetchCountries';
import { Country as CountryType } from '@/api/types';
import useDebounce from '@/utils/useDebounce';

const Main = () => {
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState<CountryType[] | null>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryType | null>(
    null
  );

  const debouncedHandleSearch = useDebounce((value: string) => {
    const lon = searchParams?.get('lon') || '';
    const lat = searchParams?.get('lat') || '';

    fetchCountries(value, lon, lat)
      .then((data) => setResults(data))
      // eslint-disable-next-line no-console
      .catch((err) => console.error(err));
  }, 300);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (selectedCountry) {
      setSelectedCountry(null);
    }

    const value = e.target.value;
    setSearchValue(value);
    debouncedHandleSearch(value);
  };

  const handleClear = () => {
    setSearchValue('');
    setSelectedCountry(null);
    setResults([]);
  };

  const noResults = searchValue && results === null;

  return (
    <div className='p-4'>
      <Search
        value={searchValue}
        onClear={handleClear}
        onChange={handleChange}
      />

      {!selectedCountry && (Boolean(results?.length) || noResults) && (
        <ul className='h-auto max-h-[400px] overflow-y-auto bg-gray-50 mt-1 border border-gray-300 p-2 rounded-lg shadow-xl'>
          {noResults ? (
            <li className='p-2 rounded-lg text-sm flex align-center gap-2'>
              Nothing was found...
            </li>
          ) : (
            results?.map((country) => (
              <CountryOption
                key={country.name}
                value={country}
                onClick={() => {
                  setSelectedCountry(country);
                  setSearchValue(country.name);
                  setResults([]);
                }}
              />
            ))
          )}
        </ul>
      )}

      {selectedCountry && <Country country={selectedCountry} />}
    </div>
  );
};

export default Main;
