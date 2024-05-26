import { Country } from '@/api/types';

export const fetchCountries = async (
  value: string,
  lon?: string,
  lat?: string
): Promise<Country[] | null> => {
  const searchParams = new URLSearchParams();
  searchParams.append('search', value);

  if (lon && lat) {
    searchParams.append('lon', lon);
    searchParams.append('lat', lat);
  }

  return (
    fetch(`/api/countries?${searchParams.toString()}`)
      .then((response) => response.json())
      // eslint-disable-next-line no-console
      .catch((err) => console.error('Error fetching countries:', err))
  );
};
