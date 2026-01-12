import React, {createContext, useState, useEffect, useContext} from 'react';
import {Appearance} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../constants/colors';

const ThemeContext = createContext();

const THEME_STORAGE_KEY = '@theme_preference';

export const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState(
    Appearance.getColorScheme() === 'dark' ? 'dark' : 'light',
  );

  useEffect(() => {
    // Load saved theme preference
    loadThemePreference();

    // Listen to system theme changes
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      AsyncStorage.getItem(THEME_STORAGE_KEY).then(savedTheme => {
        if (!savedTheme) {
          // Only use system theme if user hasn't set a preference
          setTheme(colorScheme === 'dark' ? 'dark' : 'light');
        }
      });
    });

    return () => subscription.remove();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) {
        setTheme(savedTheme);
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const currentColors = theme === 'light' ? colors.light : colors.dark;

  const value = {
    theme,
    toggleTheme,
    colors: currentColors,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
