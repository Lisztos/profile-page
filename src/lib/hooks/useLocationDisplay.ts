"use client";

import { useState, useEffect } from 'react';
import { locationConfig, americasCountries } from '../data';

interface LocationData {
  country?: string;
  country_code?: string;
}

export function useLocationDisplay() {
  const [displayLocation, setDisplayLocation] = useState<string>(locationConfig.default);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const detectLocation = async () => {
      try {
        // Try to get location from IP geolocation service
        const response = await fetch('https://ipapi.co/json/', {
          headers: {
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch location data');
        }

        const data: LocationData = await response.json();

        // Check both country and country_code fields for Americas detection
        const countryCode = data.country_code || data.country;

        if (countryCode && americasCountries.includes(countryCode as typeof americasCountries[number])) {
          setDisplayLocation(locationConfig.americas);
        } else {
          setDisplayLocation(locationConfig.default);
        }
      } catch (error) {
        console.warn('Location detection failed, using default location:', error);
        // Fallback to default location on error
        setDisplayLocation(locationConfig.default);
      } finally {
        setIsLoading(false);
      }
    };

    detectLocation();
  }, []);

  return { displayLocation, isLoading };
}