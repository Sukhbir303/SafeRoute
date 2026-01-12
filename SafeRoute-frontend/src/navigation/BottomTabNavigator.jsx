import React from 'react';
import {View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CircleScreen from '../screens/CircleScreen';
import FloatingNavbar from '../components/FloatingNavbar';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            display: 'none',
          },
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen
          name="Navigate"
          component={HomeScreen}
        />
        <Tab.Screen
          name="Circle"
          component={CircleScreen}
        />
      </Tab.Navigator>
      <FloatingNavbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BottomTabNavigator;
