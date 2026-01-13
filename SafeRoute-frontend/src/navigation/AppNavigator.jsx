// Navigation setup using React Navigation
// Install: npm install @react-navigation/native @react-navigation/stack
// npm install react-native-screens react-native-safe-area-context

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const {selectedRoute, setSelectedRoute} = useSelectedRoute();
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* Add more screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AppNavigator = () => {
  return (
    <RouteProvider>
      <RootNavigator />
    </RouteProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppNavigator;
