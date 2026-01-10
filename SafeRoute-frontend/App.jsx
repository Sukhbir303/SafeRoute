import React, { useState } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CarouselScreen from './src/screens/CarouselScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [showCarousel, setShowCarousel] = useState(true); // State to control the visibility of the CarouselScreen

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {showCarousel ? (
        <CarouselScreen onFinish={() => setShowCarousel(false)} />
      ) : (
        <AppContent />
      )}
    </SafeAreaProvider>
  );
}

function AppContent() {
  return (
    <View style={styles.container}>
      <Text>Welcome to the main app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;