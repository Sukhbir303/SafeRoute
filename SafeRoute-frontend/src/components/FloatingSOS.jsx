import React, {useRef, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import {useTheme} from '../context/ThemeContext';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const FloatingSOS = () => {
  const {colors} = useTheme();
  const pan = useRef(new Animated.ValueXY({x: SCREEN_WIDTH - 85, y: SCREEN_HEIGHT - 180})).current;
  const scale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Scale animation on mount
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
        pan.setValue({x: 0, y: 0});
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gesture) => {
        pan.flattenOffset();
        
        // Keep within screen bounds
        const newX = Math.max(0, Math.min(SCREEN_WIDTH - 65, pan.x._value));
        const newY = Math.max(0, Math.min(SCREEN_HEIGHT - 65, pan.y._value));
        
        Animated.spring(pan, {
          toValue: {x: newX, y: newY},
          useNativeDriver: false,
        }).start();
      },
    }),
  ).current;

  const handleLongPress = () => {
    Alert.alert(
      'SOS Alert',
      'Emergency services will be notified',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Confirm', onPress: () => console.log('SOS Triggered')},
      ],
    );
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{translateX: pan.x}, {translateY: pan.y}, {scale}],
        },
      ]}
      {...panResponder.panHandlers}>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: colors.alertRed}]}
        onLongPress={handleLongPress}
        delayLongPress={500}
        activeOpacity={0.8}>
        <Text style={[styles.text, {color: colors.softWhite}]}>SOS</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 999,
  },
  button: {
    width: 65,
    height: 65,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default FloatingSOS;
