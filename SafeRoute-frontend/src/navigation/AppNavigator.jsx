/**
 * Main Navigation setup for SafeRoute App
 * Handles routing between onboarding and authenticated app flows
 */

import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import { RouteProvider } from '../context/RouteContext';
import FloatingNavbar from '../components/FloatingNavbar';

// Import Screens
import CarouselScreen from '../screens/CarouselScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import ProfileForm from '../screens/ProfileForm';
import HomeScreen from '../screens/HomeScreen';
import SearchRouteScreen from '../screens/SearchRouteScreen';
import CircleScreen from '../screens/CircleScreen';
import Setting from '../screens/Setting';

const Stack = createStackNavigator();

// Root Navigator - unified stack for all screens
const RootNavigator = () => {
  const { isAuthenticated, needsProfile, isLoading, hasSeenCarousel } =
    useAuth();

  // Show loading screen while checking auth state
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: 'white' },
        }}
      >
        {/* Onboarding Flow */}
        {!isAuthenticated && !needsProfile && !hasSeenCarousel && (
          <Stack.Screen name="CarouselScreen" component={CarouselScreen} />
        )}
        {!isAuthenticated && !needsProfile && (
          <>
            <Stack.Screen name="SignupScreen" component={SignUpScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
          </>
        )}
        {!isAuthenticated && needsProfile && (
          <Stack.Screen name="ProfileFormScreen" component={ProfileForm} />
        )}

        {/* Authenticated App Flow */}
        {isAuthenticated && (
          <>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen
              name="SearchRouteScreen"
              component={SearchRouteScreen}
            />
            <Stack.Screen name="CircleScreen" component={CircleScreen} />
            <Stack.Screen name="SettingsScreen" component={Setting} />
          </>
        )}
      </Stack.Navigator>

      {/* Global FloatingNavbar - only show for authenticated users */}
      {isAuthenticated && <FloatingNavbar />}
    </>
  );
};

// Main App Navigator with providers
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RouteProvider>
        <RootNavigator />
      </RouteProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default AppNavigator;
