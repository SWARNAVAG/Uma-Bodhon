import { useState, useEffect } from 'react';

// Shared geolocation hook — browser remembers permission, only asks once per device
export default function useUserLocation() {
  const [state, setState] = useState({ location: null, geoState: 'asking' });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({ location: null, geoState: 'unavailable' });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setState({
          location: { lat: pos.coords.latitude, lng: pos.coords.longitude },
          geoState: 'granted',
        }),
      () => setState({ location: null, geoState: 'denied' }),
      { timeout: 10000, maximumAge: 300000 } // Cache for 5 minutes
    );
  }, []);

  return state;
}