"use client";

import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { americasCountries } from '../data';
import { useTranslation } from './useTranslation';

interface LocationData {
  country?: string;
  country_code?: string;
}

interface LocationContextType {
  isAmericas: boolean;
  isLoading: boolean;
  countryCode: string | null;
}

const LocationContext = createContext<LocationContextType | null>(null);

// Shared location detection hook that makes only one API call
function useLocationDetection(): LocationContextType {
  const [isAmericas, setIsAmericas] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [countryCode, setCountryCode] = useState<string | null>(null);

  useEffect(() => {
    const detectLocation = async () => {
      try {
        // Single API call to get location data
        const response = await fetch('https://ipapi.co/json/', {
          headers: {
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch location data');
        }

        const data: LocationData = await response.json();
        const detectedCountryCode = data.country_code || data.country;

        setCountryCode(detectedCountryCode || null);

        // Check if country is in the Americas
        const isAmericasCountry = detectedCountryCode &&
          americasCountries.includes(detectedCountryCode as typeof americasCountries[number]);

        setIsAmericas(!!isAmericasCountry);
      } catch (error) {
        console.warn('Location detection failed, using defaults:', error);
        // Fallback to defaults on error
        setIsAmericas(false);
        setCountryCode(null);
      } finally {
        setIsLoading(false);
      }
    };

    detectLocation();
  }, []);

  return { isAmericas, isLoading, countryCode };
}

// Provider component to share location data across the app
export function LocationProvider({ children }: { children: ReactNode }) {
  const locationData = useLocationDetection();

  return (
    <LocationContext.Provider value={locationData}>
      {children}
    </LocationContext.Provider>
  );
}

// Hook to get shared location context
function useLocationContext(): LocationContextType {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocationContext must be used within a LocationProvider');
  }
  return context;
}

// Hook for location display
export function useLocationDisplay() {
  const { isAmericas, isLoading } = useLocationContext();
  const { t } = useTranslation();

  const displayLocation = isAmericas
    ? t('locations.americas')
    : t('locations.default');

  return { displayLocation, isLoading };
}

// Hook for CV selection
export function useCVSelection() {
  const { isAmericas, isLoading } = useLocationContext();

  const cvPath = isAmericas
    ? '/CV-adrian-en-mx.pdf'
    : '/CV-adrian-en-ber.pdf';

  const handleCVDownload = (e: React.MouseEvent) => {
    e.preventDefault();

    // Simple human verification to prevent bots
    const userConfirmed = window.confirm(
      "Download CV? (This helps prevent automated downloads)"
    );

    if (userConfirmed) {
      // Create temporary link for download
      const link = document.createElement('a');
      link.href = cvPath;
      link.download = '';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return { cvPath, isLoading, handleCVDownload };
}