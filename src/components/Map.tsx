// components/Map.tsx
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useEffect, useRef } from 'react';
import { useContacts } from '../hooks/useContacts';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = {
  lat: -15.793889, // Centro do Brasil como padrão
  lng: -47.882778,
};

const defaultZoom = 5;
const selectedZoom = 15;

export const Map = () => {
  const { contacts, selectedContact, setSelectedContact } = useContacts();

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  // Efeito para navegar até o contato selecionado
  useEffect(() => {
    if (!mapRef.current || !selectedContact?.latitude || !selectedContact.longitude) return;

    mapRef.current.panTo({
      lat: selectedContact.latitude,
      lng: selectedContact.longitude,
    });
    mapRef.current.setZoom(selectedZoom);
  }, [selectedContact]);

  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-full text-dragon-700 dark:text-white">
        Carregando mapa...
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={defaultZoom}
      onLoad={handleMapLoad}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      }}
    >
      {contacts?.map(contact => {
        if (!contact.latitude || !contact.longitude) return null;

        return (
          <Marker
            key={contact.id}
            position={{
              lat: contact.latitude,
              lng: contact.longitude,
            }}
            title={contact.name}
            onClick={() => setSelectedContact(contact)}
            icon={{
              url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              scaledSize: new google.maps.Size(32, 32),
            }}
          />
        );
      })}
    </GoogleMap>
  );
};
