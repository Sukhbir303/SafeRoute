// API endpoints and configuration
export const API_CONFIG = {
  BASE_URL: 'http://localhost:5000/api',
  TIMEOUT: 10000,
};

// Colors - Dark Theme
export const COLORS_DARK = {
  // Primary Colors
  primaryBlue: '#0B1C2D',
  deepNavy: '#102A43',
  
  // Safety & Emergency
  tealGreen: '#1DB9A0',
  alertRed: '#E63946',
  amber: '#F4A261',
  
  // Text Colors
  softWhite: '#F1FAEEE',
  coolGray: '#A8B2C1',
  mutedGray: '#7D8A9A',
  
  // Map Indicators
  safeGreen: '#2ECC71',
  warningAmber: '#F4A261',
  dangerRed: '#E63946',
  softRed: '#FF686B',
  
  // UI
  background: '#0B1C2D',
  text: '#F1FAEEE',
  textSecondary: '#A8B2C1',
};

// Colors - Light Theme
export const COLORS_LIGHT = {
  // Primary Colors
  softBlue: '#E4F2FB',
  lightGray: '#F0F4F8',
  
  // Safety & Emergency
  tealGreen: '#1DB9A0',
  alertRed: '#E63946',
  amber: '#F4A261',
  
  // Text Colors
  charcoal: '#2B344B',
  darkGray: '#5F6E7D',
  mutedGray: '#9AA6B8',
  
  // Map Indicators
  safeGreen: '#2ECC71',
  warningAmber: '#F4A261',
  dangerRed: '#E63946',
  softRed: '#FF686B',
  
  // UI
  background: '#FFFFFF',
  text: '#2B344B',
  textSecondary: '#5F6E7D',
};

// Default to light theme (can be switched based on user preference)
export const COLORS = COLORS_LIGHT;

// Screen names
export const SCREENS = {
  HOME: 'Home',
  PROFILE: 'Profile',
  LOGIN: 'Login',
  REGISTER: 'Register',
};
