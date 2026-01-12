// components/DraggableSOS.js
import React, {useRef} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  Alert,
} from 'react-native';
import {useTheme} from '../context/ThemeContext';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

export default function DraggableSOS() {
  const {colors} = useTheme();
  const pan = useRef(new Animated.ValueXY({x: SCREEN_WIDTH - 80, y: SCREEN_HEIGHT - 200})).current;

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
      onPanResponderRelease: () => {
        pan.flattenOffset();
        
        // Keep within screen bounds
        const newX = Math.max(10, Math.min(SCREEN_WIDTH - 70, pan.x._value));
        const newY = Math.max(100, Math.min(SCREEN_HEIGHT - 200, pan.y._value));
        
        // Snap left or right
        const snapX = pan.x._value < SCREEN_WIDTH / 2 ? 10 : SCREEN_WIDTH - 70;
        
        Animated.spring(pan, {
          toValue: {x: snapX, y: newY},
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
          transform: [{translateX: pan.x}, {translateY: pan.y}],
        },
      ]}
      {...panResponder.panHandlers}>
      <Pressable 
        style={[styles.btn, {backgroundColor: colors.alertRed || 'red'}]}
        onLongPress={handleLongPress}
        delayLongPress={500}>
        <Text style={styles.txt}>SOS</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 999,
  },
  btn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  txt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
