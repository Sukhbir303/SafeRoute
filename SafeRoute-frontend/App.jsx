/**
 * SafeRoute App
 * @format
 */

import React, {useState} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider, useTheme} from './src/context/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';
import CarouselScreen from './src/screens/CarouselScreen';

function AppContent() {
  const {theme} = useTheme();
  const [showCarousel, setShowCarousel] = useState(true);

  if (showCarousel) {
    return <CarouselScreen onFinish={() => setShowCarousel(false)} />;
  }

  return (
    <>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      <AppNavigator />
    </>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
