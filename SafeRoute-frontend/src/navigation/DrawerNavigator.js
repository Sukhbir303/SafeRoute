import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeScreen, SearchRouteScreen } from '../screens';
import CustomDrawerContent from '../components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

// Placeholder Screens
const SettingsScreen = () => (
  <View style={styles.placeholderContainer}>
    <Text style={styles.placeholderText}>Settings Screen</Text>
  </View>
);

const OfflineMapsScreen = () => (
  <View style={styles.placeholderContainer}>
    <Text style={styles.placeholderText}>Offline Maps Screen</Text>
  </View>
);

const JourneyHistoryScreen = () => (
  <View style={styles.placeholderContainer}>
    <Text style={styles.placeholderText}>Journey History Screen</Text>
  </View>
);

const EvidenceVaultScreen = () => (
  <View style={styles.placeholderContainer}>
    <Text style={styles.placeholderText}>Evidence Vault Screen</Text>
  </View>
);

const SafetyResourcesScreen = () => (
  <View style={styles.placeholderContainer}>
    <Text style={styles.placeholderText}>Safety Resources Screen</Text>
  </View>
);

const HelpSupportScreen = () => (
  <View style={styles.placeholderContainer}>
    <Text style={styles.placeholderText}>Help & Support Screen</Text>
  </View>
);

// Drawer Navigator Component
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          width: 280,
        },
        swipeEnabled: true,
        swipeEdgeWidth: 50,
      }}
    >
      <Drawer.Screen 
        name="HomeScreen" 
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Drawer.Screen 
        name="SearchRouteScreen" 
        component={SearchRouteScreen}
        options={{
          headerShown: false,
          title: 'Search Route',
        }}
      />
      <Drawer.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          title: 'Settings',
        }}
      />
      <Drawer.Screen 
        name="OfflineMaps" 
        component={OfflineMapsScreen}
        options={{
          title: 'Offline Maps',
        }}
      />
      <Drawer.Screen 
        name="JourneyHistory" 
        component={JourneyHistoryScreen}
        options={{
          title: 'Journey History',
        }}
      />
      <Drawer.Screen 
        name="EvidenceVault" 
        component={EvidenceVaultScreen}
        options={{
          title: 'Evidence Vault',
        }}
      />
      <Drawer.Screen 
        name="SafetyResources" 
        component={SafetyResourcesScreen}
        options={{
          title: 'Safety Resources',
        }}
      />
      <Drawer.Screen 
        name="HelpSupport" 
        component={HelpSupportScreen}
        options={{
          title: 'Help & Support',
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  placeholderText: {
    fontSize: 20,
    color: '#666666',
    fontWeight: '600',
  },
});

export default DrawerNavigator;
