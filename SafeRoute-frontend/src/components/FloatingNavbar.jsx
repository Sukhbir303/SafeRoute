import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert, Platform, Animated} from 'react-native';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {BlurView} from '@react-native-community/blur';
import {useTheme} from '../context/ThemeContext';

const {width} = Dimensions.get('window');

const FloatingNavbar = ({selectedRoute = null, onStartNavigationPress = null, onCancelRoute = null}) => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const animValue = useRef(new Animated.Value(0)).current;
  
  // Animate when selectedRoute changes
  useEffect(() => {
    Animated.timing(animValue, {
      toValue: selectedRoute ? 1 : 0,
      duration: 250,
      useNativeDriver: false, // height animations require layout
    }).start();
  }, [selectedRoute]);
  
  // Interpolate values
  const navbarHeight = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 75],
  });
  
  const opacityTabs = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  
  const opacityButton = animValue;
  
  const translateYTabs = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 10],
  });
  
  const translateYButton = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 0],
  });
  
  // Get current route with safe fallback
  let currentRoute = 'HomeScreen';
  try {
    const state = useNavigationState((state) => state);
    currentRoute = state?.routes?.[state?.index]?.name || 'HomeScreen';
  } catch (error) {
    console.log('Navigation state not available yet');
  }

  // Check active routes
  const isHome = currentRoute === 'HomeScreen';
  const isNavigate =
    currentRoute === 'SearchRouteScreen' ||
    currentRoute === 'RouteSelectionScreen' ||
    currentRoute === 'NavigationScreen';
  const isCircle = currentRoute === 'CircleScreen';

  // Theme colors for active/inactive states
  const activeColor = colors.tealGreen;
  const inactiveColor = colors.softWhite;

  const handleNavigatePress = () => {
    navigation.navigate('SearchRouteScreen');
  };

  const handleCirclePress = () => {
    navigation.navigate('CircleScreen');
  };

  const NavButton = ({iconName, label, isActive, onPress}) => {
    const iconColor = isActive ? activeColor : inactiveColor;
    const opacity = isActive ? 1 : 0.7;

    return (
      <TouchableOpacity
        style={styles.navButton}
        onPress={onPress}
        activeOpacity={0.7}>
        <Icon 
          name={iconName} 
          size={26} 
          color={iconColor}
          style={{opacity}}
        />
        <Text 
          style={[
            styles.navLabel, 
            {color: iconColor, opacity}
          ]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  const blurIntensity = 15;

  return (
    <View style={styles.container}>
      <BlurView
        style={styles.blurContainer}
        blurType="dark"
        blurAmount={blurIntensity}
        reducedTransparencyFallbackColor={colors.deepNavy || '#1a1a2e'}>
        <Animated.View style={[
          styles.contentContainer, 
          {
            backgroundColor: `${colors.deepNavy || '#1a1a2e'}CC`,
            height: navbarHeight,
          }
        ]}>
          {/* Tab mode - fades out */}
          <Animated.View 
            style={[
              styles.tabsContainer,
              {
                opacity: opacityTabs,
                transform: [{translateY: translateYTabs}],
              }
            ]}
            pointerEvents={selectedRoute ? 'none' : 'auto'}>
            <NavButton
              iconName="home"
              label="Home"
              isActive={isHome}
              onPress={() => navigation.navigate('HomeScreen')}
            />
            <NavButton
              iconName="navigate"
              label="Navigate"
              isActive={isNavigate}
              onPress={handleNavigatePress}
            />
            <NavButton
              iconName="people"
              label="Circle"
              isActive={isCircle}
              onPress={handleCirclePress}
            />
          </Animated.View>
          
          {/* CTA mode - fades in */}
          <Animated.View 
            style={[
              styles.startNavigationContainer,
              {
                opacity: opacityButton,
                transform: [{translateY: translateYButton}],
              }
            ]}
            pointerEvents={selectedRoute ? 'auto' : 'none'}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onCancelRoute}
              activeOpacity={0.7}>
              <Icon name="close" size={24} color={colors.softWhite} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.fullWidthStartButton, {backgroundColor: colors.tealGreen}]}
              onPress={onStartNavigationPress}
              activeOpacity={0.8}>
              <Icon name="navigate" size={24} color={colors.softWhite} style={{marginRight: 8}} />
              <Text style={[styles.fullWidthStartText, {color: colors.softWhite}]}>
                Start Navigation
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: '7.5%',
    width: '85%',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
  },
  blurContainer: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  contentContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    width: '100%',
    position: 'absolute',
    left: 16,
    right: 16,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 8,
  },
  navLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
  startNavigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    left: 16,
    right: 16,
  },
  cancelButton: {
    padding: 8,
    marginRight: 8,
  },
  fullWidthStartButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  fullWidthStartText: {
    fontSize: 16,
    fontWeight: '700',
  },
  startNavButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 8,
  },
  startNavLabel: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 4,
  },
});

export default FloatingNavbar;
