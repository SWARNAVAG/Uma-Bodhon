// @ts-nocheck
import { useState, useEffect, useCallback } from 'react';

// Shared geolocation hook — using watchPosition to continuously track location
// and provide a refresh function to re-request location
export default function useUserLocation() {
  const [state, setState] = useState({ location: null, geoState: 'asking' });
  const [watchId, setWatchId] = useState(null);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState({ location: null, geoState: 'unavailable' });
      return;
    }

    setState(prev => ({ ...prev, geoState: 'asking' }));

    // Clear any existing watch
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
    }

    // Use watchPosition to continuously track - this may re-prompt for permission
    // in some browsers when the page is reloaded
    const id = navigator.geolocation.watchPosition(
      (pos) =>
        setState({
          location: { lat: pos.coords.latitude, lng: pos.coords.longitude },
          geoState: 'granted',
        }),
      () => setState({ location: null, geoState: 'denied' }),
      { 
        timeout: 10000,
        enableHighAccuracy: true,
        maximumAge: 0 // Don't use cached position
      }
    );
    setWatchId(id);
  }, [watchId]);

  useEffect(() => {
    requestLocation();

    // Cleanup on unmount
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [requestLocation]);

  return { ...state, refreshLocation: requestLocation };
}