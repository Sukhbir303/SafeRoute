// Navigation setup using React Navigation
// Install: npm install @react-navigation/native @react-navigation/stack
// npm install react-native-screens react-native-safe-area-context

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SearchRouteScreen} from '../screens';
import HomeScreen from '../screens/HomeScreen';
import CircleScreen from '../screens/CircleScreen';
import FloatingNavbar from '../components/FloatingNavbar';
import {RouteProvider, useSelectedRoute} from '../context/RouteContext';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const {selectedRoute, setSelectedRoute} = useSelectedRoute();
  
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="CircleScreen" component={CircleScreen} />
          <Stack.Screen name="SearchRouteScreen" component={SearchRouteScreen} />
          {/* Add more screens here */}
        </Stack.Navigator>
        <FloatingNavbar 
          selectedRoute={selectedRoute}
          onStartNavigationPress={null}
          onCancelRoute={() => setSelectedRoute(null)}
        />
      </View>
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
