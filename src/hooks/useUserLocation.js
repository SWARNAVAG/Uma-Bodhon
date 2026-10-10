import { useState, useEffect } from 'react';

// Shared geolocation hook — the browser's permission prompt fires on entry
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
      { timeout: 10000 }
    );
  }, []);

  return state;
}