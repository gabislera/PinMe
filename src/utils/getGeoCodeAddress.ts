import axios from 'axios';
import type { ContactSchema } from '../pages/home/Contacts/CreateContact';

interface GeoCodeResult {
  lat: number;
  lng: number;
}

export const getGeoCodeAddress = async (
  address: ContactSchema['address']
): Promise<GeoCodeResult> => {
  const { street, number, city, state } = address;

  const fullAddress = `${street}, ${number}, ${city} - ${state}, Brasil`;
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

  const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: {
      address: fullAddress,
      key: apiKey,
    },
  });

  const result = response.data.results[0];

  if (!result) {
    throw new Error('Endereço não encontrado no Google Maps');
  }

  return result.geometry.location;
};
