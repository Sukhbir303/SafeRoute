import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  Modal,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import useHomeState from '../hooks/useHomeState';
import SearchBar from '../components/SearchBar';
import DraggableSOS from '../components/DraggableSOS';
import MapFilters from '../components/MapFilters';
import CustomDrawerContent from '../components/CustomDrawerContent';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const {
    showHeatmap,
    showVolunteers,
    showIncidents,
    toggleHeatmap,
    toggleVolunteers,
    toggleIncidents,
    recentTrips,
    safeSpots,
    journeyHistory,
  } = useHomeState();
  const [userLocation, setUserLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 19.076,
    longitude: 72.8777,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width * 0.8)).current;

  // Hardcoded marker data
  const policeStations = [
    {
      id: 1,
      title: 'Central Police Station',
      latitude: 19.08,
      longitude: 72.88,
    },
    { id: 2, title: 'West Police Station', latitude: 19.07, longitude: 72.87 },
    {
      id: 3,
      title: 'East Police Station',
      latitude: 19.085,
      longitude: 72.885,
    },
  ];

  const hospitals = [
    { id: 1, title: 'City Hospital', latitude: 19.078, longitude: 72.875 },
    { id: 2, title: 'Medical Center', latitude: 19.072, longitude: 72.882 },
    { id: 3, title: 'Health Clinic', latitude: 19.082, longitude: 72.872 },
  ];

  const volunteers = [
    { id: 1, title: 'Volunteer A', latitude: 19.074, longitude: 72.878 },
    { id: 2, title: 'Volunteer B', latitude: 19.079, longitude: 72.873 },
    { id: 3, title: 'Volunteer C', latitude: 19.083, longitude: 72.881 },
    { id: 4, title: 'Volunteer D', latitude: 19.071, longitude: 72.876 },
  ];

  const dangerZones = [
    { id: 1, title: 'High Crime Area', latitude: 19.077, longitude: 72.879 },
    { id: 2, title: 'Dark Alley', latitude: 19.081, longitude: 72.874 },
    { id: 3, title: 'Unsafe Zone', latitude: 19.073, longitude: 72.883 },
  ];

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'SafeRoute needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      getCurrentLocation();
    }
  };

  const getCurrentLocation = () => {
    try {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          setMapRegion({
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        },
        error => {
          console.log('Error getting location:', error);
          // Use default Mumbai location if geolocation fails
          setMapRegion({
            latitude: 19.076,
            longitude: 72.8777,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
    } catch (error) {
      console.log('Geolocation error:', error);
      // Use default Mumbai location if geolocation fails
      setMapRegion({
        latitude: 19.076,
        longitude: 72.8777,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  const toggleDrawer = () => {
    if (isDrawerOpen) {
      // Close drawer
      Animated.timing(slideAnim, {
        toValue: -width * 0.8,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsDrawerOpen(false));
    } else {
      // Open drawer
      setIsDrawerOpen(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleSOSPress = () => {
    console.log('SOS Button Pressed');
    // TODO: Implement SOS functionality
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Menu Button */}
        <TouchableOpacity
          style={[styles.menuButton, { backgroundColor: colors.surface }]}
          onPress={toggleDrawer}
        >
          <Icon name="menu" size={24} color={colors.textPrimary} />
        </TouchableOpacity>

        {/* Google Map */}
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={mapRegion}
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
        >
          {/* Police Station Markers - Always visible */}
          {showHeatmap &&
            policeStations.map(station => (
              <Marker
                key={`police-${station.id}`}
                coordinate={{
                  latitude: station.latitude,
                  longitude: station.longitude,
                }}
                title={station.title}
                description="Police Station"
                pinColor={colors.primary}
              />
            ))}

          {/* Hospital Markers - Always visible */}
          {showHeatmap &&
            hospitals.map(hospital => (
              <Marker
                key={`hospital-${hospital.id}`}
                coordinate={{
                  latitude: hospital.latitude,
                  longitude: hospital.longitude,
                }}
                title={hospital.title}
                description="Hospital"
                pinColor={colors.accent}
              />
            ))}

          {/* Volunteer Markers - Show when volunteers toggle is on */}
          {showVolunteers &&
            volunteers.map(volunteer => (
              <Marker
                key={`volunteer-${volunteer.id}`}
                coordinate={{
                  latitude: volunteer.latitude,
                  longitude: volunteer.longitude,
                }}
                title={volunteer.title}
                description="Available Volunteer"
                pinColor={colors.safeGreen}
              />
            ))}

          {/* Danger Zone Markers - Show when incidents toggle is on */}
          {showIncidents &&
            dangerZones.map(zone => (
              <Marker
                key={`danger-${zone.id}`}
                coordinate={{
                  latitude: zone.latitude,
                  longitude: zone.longitude,
                }}
                title={zone.title}
                description="Danger Zone"
                pinColor={colors.dangerRed}
              />
            ))}
        </MapView>

        {/* Floating Search Bar */}
        <View style={styles.searchBarContainer}>
          <SearchBar
            onPress={() => navigation.navigate('SearchRouteScreen')}
            showMenu={false}
          />
        </View>

        {/* Map Filters */}
        <View style={styles.filtersContainer}>
          <MapFilters
            showHeatmap={showHeatmap}
            showVolunteers={showVolunteers}
            showIncidents={showIncidents}
            toggleHeatmap={toggleHeatmap}
            toggleVolunteers={toggleVolunteers}
            toggleIncidents={toggleIncidents}
          />
        </View>

        {/* SOS Button */}
        <DraggableSOS />

        {/* Custom Drawer Modal */}
        <Modal
          visible={isDrawerOpen}
          transparent={true}
          animationType="none"
          onRequestClose={toggleDrawer}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.drawerOverlay}
              activeOpacity={1}
              onPress={toggleDrawer}
            />
            <Animated.View
              style={[
                styles.drawerContainer,
                { transform: [{ translateX: slideAnim }] },
              ]}
            >
              <CustomDrawerContent
                navigation={navigation}
                onClose={toggleDrawer}
              />
            </Animated.View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    paddingBottom: 100,
  },
  menuButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1000,
    backgroundColor: '#FFFFFF',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  map: {
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  searchBarContainer: {
    position: 'absolute',
    top: 20,
    left: 80,
    right: 20,
  },
  filtersContainer: {
    position: 'absolute',
    top: 80,
    left: 10,
    right: 10,
  },
  modalContainer: {
    flex: 1,
  },
  drawerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawerContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: width * 0.8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
});

export default HomeScreen;
