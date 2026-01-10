import { Platform, PermissionsAndroid, Alert, Linking } from 'react-native';
import { request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';

/**
 * Request all necessary permissions for the app
 * This function is called after successful signup
 */
export const requestPermissions = async () => {
  const permissionsNeeded = [
    { name: 'Location', type: 'location' },
    { name: 'SMS', type: 'sms' },
    { name: 'Phone', type: 'phone' },
    { name: 'Contacts', type: 'contacts' },
    { name: 'Microphone', type: 'microphone' },
  ];

  const results = {
    granted: [],
    denied: [],
    blocked: [],
  };

  // Request permissions based on platform
  if (Platform.OS === 'android') {
    await requestAndroidPermissions(permissionsNeeded, results);
  } else {
    await requestIOSPermissions(permissionsNeeded, results);
  }

  // Show results to user
  showPermissionResults(results);

  return results;
};

/**
 * Request permissions on Android
 */
const requestAndroidPermissions = async (permissionsNeeded, results) => {
  for (const permission of permissionsNeeded) {
    try {
      let result;
      
      switch (permission.type) {
        case 'location':
          result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'SafeRoute needs access to your location to provide safety alerts and route guidance.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
          break;

        case 'sms':
          result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.SEND_SMS,
            {
              title: 'SMS Permission',
              message: 'SafeRoute needs SMS access to send emergency alerts to your contacts.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
          break;

        case 'phone':
          result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CALL_PHONE,
            {
              title: 'Phone Permission',
              message: 'SafeRoute needs phone access to make emergency calls.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
          break;

        case 'contacts':
          result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
              title: 'Contacts Permission',
              message: 'SafeRoute needs access to your contacts to set up emergency contacts.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
          break;

        case 'microphone':
          result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
              title: 'Microphone Permission',
              message: 'SafeRoute needs microphone access for voice commands and emergency recording.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
          break;

        default:
          result = PermissionsAndroid.RESULTS.DENIED;
      }

      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        results.granted.push(permission.name);
      } else if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        results.blocked.push(permission.name);
      } else {
        results.denied.push(permission.name);
      }
    } catch (error) {
      console.error(`Error requesting ${permission.name} permission:`, error);
      results.denied.push(permission.name);
    }
  }
};

/**
 * Request permissions on iOS
 */
const requestIOSPermissions = async (permissionsNeeded, results) => {
  for (const permission of permissionsNeeded) {
    try {
      let permissionType;
      
      switch (permission.type) {
        case 'location':
          permissionType = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
          break;
        case 'contacts':
          permissionType = PERMISSIONS.IOS.CONTACTS;
          break;
        case 'microphone':
          permissionType = PERMISSIONS.IOS.MICROPHONE;
          break;
        default:
          // SMS and Phone permissions are handled differently on iOS
          continue;
      }

      const result = await request(permissionType);

      if (result === RESULTS.GRANTED) {
        results.granted.push(permission.name);
      } else if (result === RESULTS.BLOCKED) {
        results.blocked.push(permission.name);
      } else {
        results.denied.push(permission.name);
      }
    } catch (error) {
      console.error(`Error requesting ${permission.name} permission:`, error);
      results.denied.push(permission.name);
    }
  }

  // Note: iOS doesn't have SMS and direct phone call permissions
  // These will be handled at the time of use
};

/**
 * Show permission results to user
 */
const showPermissionResults = (results) => {
  if (results.blocked.length > 0) {
    Alert.alert(
      'Permissions Required',
      `The following permissions were blocked: ${results.blocked.join(', ')}.\n\nPlease enable them in Settings for full functionality.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => openSettings() },
      ]
    );
  } else if (results.denied.length > 0 && results.granted.length === 0) {
    Alert.alert(
      'Permissions Required',
      'Some permissions were denied. SafeRoute works best with all permissions enabled.',
      [{ text: 'OK' }]
    );
  } else if (results.granted.length > 0) {
    Alert.alert(
      'Permissions Granted',
      `Thank you! SafeRoute is now ready to keep you safe.`,
      [{ text: 'OK' }]
    );
  }
};

/**
 * Check if a specific permission is granted
 */
export const checkPermission = async (permissionType) => {
  if (Platform.OS === 'android') {
    let permission;
    
    switch (permissionType) {
      case 'location':
        permission = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
        break;
      case 'sms':
        permission = PermissionsAndroid.PERMISSIONS.SEND_SMS;
        break;
      case 'phone':
        permission = PermissionsAndroid.PERMISSIONS.CALL_PHONE;
        break;
      case 'contacts':
        permission = PermissionsAndroid.PERMISSIONS.READ_CONTACTS;
        break;
      case 'microphone':
        permission = PermissionsAndroid.PERMISSIONS.RECORD_AUDIO;
        break;
      default:
        return false;
    }

    const result = await PermissionsAndroid.check(permission);
    return result;
  } else {
    // iOS permission checking
    let permission;
    
    switch (permissionType) {
      case 'location':
        permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
        break;
      case 'contacts':
        permission = PERMISSIONS.IOS.CONTACTS;
        break;
      case 'microphone':
        permission = PERMISSIONS.IOS.MICROPHONE;
        break;
      default:
        return false;
    }

    const result = await request(permission);
    return result === RESULTS.GRANTED;
  }
};

/**
 * Request a specific permission
 */
export const requestSinglePermission = async (permissionType) => {
  const permission = { name: permissionType, type: permissionType };
  const results = {
    granted: [],
    denied: [],
    blocked: [],
  };

  if (Platform.OS === 'android') {
    await requestAndroidPermissions([permission], results);
  } else {
    await requestIOSPermissions([permission], results);
  }

  return results.granted.length > 0;
};


