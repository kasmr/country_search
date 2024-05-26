import { NextRequest, NextResponse } from 'next/server';

import countriesData from './data.json';

const EARTH_RADIUS_KM = 6371;

const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
};

const getLocation = async () => {
  const response = await fetch('http://ip-api.com/json');
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

export async function GET(req: NextRequest) {
  const searchQuery = req.nextUrl.searchParams.get('search') || '';
  const latQuery = req.nextUrl.searchParams.get('lat') || '';
  const lonQuery = req.nextUrl.searchParams.get('lon') || '';

  try {
    let latitude: number;
    let longitude: number;

    if (
      latQuery &&
      lonQuery &&
      !Number.isNaN(+latQuery) &&
      !Number.isNaN(+lonQuery)
    ) {
      latitude = Number(latQuery);
      longitude = Number(lonQuery);
    } else {
      const { lat, lon } = await getLocation();
      latitude = lat;
      longitude = lon;
    }

    const filteredCountries = countriesData
      .filter(({ name }) =>
        name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map(({ name, latlng, flag, capital }) => ({
        name,
        latlng,
        flag,
        capital,
      }));

    const sortedCountries = filteredCountries.toSorted((a, b) => {
      const distanceA = calculateDistance(
        latitude,
        longitude,
        a.latlng[0],
        a.latlng[1]
      );
      const distanceB = calculateDistance(
        latitude,
        longitude,
        b.latlng[0],
        b.latlng[1]
      );
      return distanceA - distanceB;
    });

    return NextResponse.json(sortedCountries.length ? sortedCountries : null);
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch location or countries' },
      { status: 500 }
    );
  }
}
