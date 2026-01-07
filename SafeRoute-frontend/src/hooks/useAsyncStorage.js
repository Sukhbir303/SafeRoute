// Example custom hook - like useState but saves to AsyncStorage
// Install: npm install @react-native-async-storage/async-storage

import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAsyncStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    // Load stored value on mount
    const loadStoredValue = async () => {
      try {
        const item = await AsyncStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        }
      } catch (error) {
        console.error('Error loading from AsyncStorage:', error);
      }
    };
    loadStoredValue();
  }, [key]);

  const setValue = async (value) => {
    try {
      setStoredValue(value);
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to AsyncStorage:', error);
    }
  };

  return [storedValue, setValue];
};
