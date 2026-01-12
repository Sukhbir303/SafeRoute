import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  Animated,
  RefreshControl,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../context/ThemeContext';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {SwipeListView} from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createMaterialTopTabNavigator();

// Emergency Contacts Tab Component
const EmergencyContactsTab = () => {
  const {colors} = useTheme();
  
  const [contacts, setContacts] = useState([
    {id: '1', name: 'Mom', relation: 'Mother', image: null, online: true, primary: true},
    {id: '2', name: 'Aarav', relation: 'Brother', image: null, online: false, primary: false},
    {id: '3', name: 'Neha', relation: 'Friend', image: null, online: true, primary: false},
  ]);
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert('Refreshed', 'Emergency contacts updated');
    }, 1500);
  };

  const onlineCount = contacts.filter(c => c.online).length;

  const handleCall = (contact) => {
    Alert.alert('Call', `Calling ${contact.name}...`);
  };

  const handleRemove = (contact) => {
    Alert.alert(
      'Remove Contact',
      `Remove ${contact.name} from emergency contacts?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => setContacts(contacts.filter(c => c.id !== contact.id))
        }
      ]
    );
  };

  const handleContactPress = (contact) => {
    Alert.alert('Edit Contact', 'Edit contact screen coming soon!');
  };

  const handleAddContact = () => {
    Alert.alert('Add Contact', 'Add contact screen coming soon!');
  };

  const renderContact = ({item, index}) => (
    <Animated.View style={{opacity: fadeAnim}}>
      <TouchableOpacity
        style={[styles.contactRow, {backgroundColor: colors.deepNavy}]}
        onPress={() => handleContactPress(item)}
        activeOpacity={0.7}>
        <View style={[styles.avatar, {backgroundColor: colors.tealGreen}]}>
          <Text style={[styles.avatarText, {color: colors.softWhite}]}>
            {item.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.contactInfo}>
          <View style={styles.nameRow}>
            <Text style={[styles.contactName, {color: colors.softWhite}]}>
              {item.name}
            </Text>
            {item.primary && (
              <Icon name="star" size={16} color={colors.amber} style={{marginLeft: 6}} />
            )}
          </View>
          <Text style={[styles.contactRelation, {color: colors.mutedGray}]}>
            {item.relation}
          </Text>
        </View>
        <View style={[styles.onlineDot, {backgroundColor: item.online ? colors.safeGreen : colors.alertRed}]} />
      </TouchableOpacity>
    </Animated.View>
  );

  const renderHiddenItem = ({item}) => (
    <View style={styles.hiddenRow}>
      <TouchableOpacity
        style={[styles.hiddenButton, styles.callButton, {backgroundColor: colors.tealGreen}]}
        onPress={() => handleCall(item)}>
        <Icon name="call" size={24} color={colors.softWhite} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.tabContainer, {backgroundColor: colors.primary}]}>
      <View style={styles.headerInfo}>
        <Text style={[styles.onlineText, {color: colors.mutedGray}]}>
          {onlineCount} {onlineCount === 1 ? 'contact' : 'contacts'} online
        </Text>
      </View>

      <SwipeListView
        data={contacts}
        renderItem={renderContact}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-70}
        disableRightSwipe
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.tealGreen}
            colors={[colors.tealGreen]}
          />
        }
      />

      <TouchableOpacity
        style={[styles.fab, {backgroundColor: colors.tealGreen}]}
        onPress={handleAddContact}
        activeOpacity={0.8}>
        <Icon name="add" size={28} color={colors.softWhite} />
      </TouchableOpacity>
    </View>
  );
};

// I'm Tracking Tab Component
const ImTrackingTab = () => {
  const {colors} = useTheme();
  
  const [tracking, setTracking] = useState([
    {id: '1', name: 'Riya', status: 'safe', lastSeen: '3 mins ago', sharingLocation: true},
    {id: '2', name: 'Karan', status: 'warning', lastSeen: '7 mins ago', sharingLocation: false},
  ]);
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert('Refreshed', 'Tracking list updated');
    }, 1500);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'safe':
        return colors.safeGreen;
      case 'warning':
        return colors.amber;
      case 'offline':
        return colors.mutedGray;
      default:
        return colors.mutedGray;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'safe':
        return 'Safe';
      case 'warning':
        return 'Warning';
      case 'offline':
        return 'Offline';
      default:
        return 'Unknown';
    }
  };

  const handleTrackingPress = (item) => {
    Alert.alert('Live Map', `Opening live map preview for ${item.name}...`);
  };

  const handleRemoveTracking = (item) => {
    Alert.alert(
      'Stop Tracking',
      `Stop tracking ${item.name}?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Stop',
          style: 'destructive',
          onPress: () => setTracking(tracking.filter(t => t.id !== item.id))
        }
      ]
    );
  };

  const renderTrackingItem = ({item, index}) => (
    <Animated.View style={{opacity: fadeAnim}}>
      <TouchableOpacity
        style={[styles.trackingItem, {backgroundColor: colors.deepNavy}]}
        onPress={() => handleTrackingPress(item)}
        activeOpacity={0.7}>
        <View style={[styles.avatar, {backgroundColor: colors.tealGreen}]}>
          <Text style={[styles.avatarText, {color: colors.softWhite}]}>
            {item.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.trackingContent}>
          <View style={styles.trackingHeader}>
            <Text style={[styles.trackingName, {color: colors.softWhite}]}>
              {item.name}
            </Text>
            {item.sharingLocation && (
              <Icon name="location" size={16} color={colors.tealGreen} style={{marginLeft: 6}} />
            )}
          </View>
          <View style={styles.trackingMeta}>
            <View style={[styles.statusChip, {backgroundColor: getStatusColor(item.status)}]}>
              <Text style={[styles.statusText, {color: colors.softWhite}]}>
                {getStatusText(item.status)}
              </Text>
            </View>
            <Text style={[styles.lastSeenText, {color: colors.mutedGray}]}>
              • {item.lastSeen}
            </Text>
          </View>
        </View>
        <Icon name="chevron-forward" size={20} color={colors.mutedGray} />
      </TouchableOpacity>
    </Animated.View>
  );

  const renderHiddenTrackingItem = ({item}) => (
    <View style={styles.hiddenRow}>
      <TouchableOpacity
        style={[styles.hiddenButton, {backgroundColor: colors.alertRed}]}
        onPress={() => handleRemoveTracking(item)}>
        <Icon name="close-circle" size={22} color={colors.softWhite} />
      </TouchableOpacity>
    </View>
  );

  if (tracking.length === 0) {
    return (
      <View style={[styles.emptyContainer, {backgroundColor: colors.primary}]}>
        <Icon name="people-outline" size={64} color={colors.mutedGray} />
        <Text style={[styles.emptyText, {color: colors.mutedGray}]}>
          You're not tracking anyone right now
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.tabContainer, {backgroundColor: colors.primary}]}>
      <SwipeListView
        data={tracking}
        renderItem={renderTrackingItem}
        renderHiddenItem={renderHiddenTrackingItem}
        rightOpenValue={-68}
        disableRightSwipe
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.trackingList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.tealGreen}
            colors={[colors.tealGreen]}
          />
        }
      />
    </View>
  );
};

// Volunteers Tab Component
const VolunteersTab = () => {
  const {colors} = useTheme();
  
  const [volunteers] = useState([
    {id: '1', name: 'Volunteer A', dist: '400m', rating: 4.8},
    {id: '2', name: 'Volunteer B', dist: '1.2km', rating: 4.5},
  ]);
  const [trackMeEnabled, setTrackMeEnabled] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert('Refreshed', 'Volunteer list updated');
    }, 1500);
  };

  const toggleTrackMe = () => {
    setTrackMeEnabled(!trackMeEnabled);
    Alert.alert(
      trackMeEnabled ? 'Tracking Disabled' : 'Tracking Enabled',
      trackMeEnabled 
        ? 'Volunteers can no longer track your location'
        : 'Volunteers can now track your location for safety'
    );
  };

  const handleAlertVolunteer = (volunteer) => {
    Alert.alert('Success', 'Volunteer has been notified');
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={`full-${i}`} name="star" size={14} color={colors.amber} />);
    }
    if (hasHalfStar) {
      stars.push(<Icon key="half" name="star-half" size={14} color={colors.amber} />);
    }
    return stars;
  };

  const renderVolunteer = ({item, index}) => (
    <Animated.View style={{opacity: fadeAnim}}>
      <View style={[styles.volunteerCard, {backgroundColor: colors.deepNavy}]}>
        <View style={styles.volunteerRow}>
          <View style={[styles.avatar, {backgroundColor: colors.amber}]}>
            <Text style={[styles.avatarText, {color: colors.softWhite}]}>
              {item.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.volunteerInfo}>
            <Text style={[styles.volunteerName, {color: colors.softWhite}]}>
              {item.name}
            </Text>
            <Text style={[styles.volunteerDist, {color: colors.mutedGray}]}>
              {item.dist} away
            </Text>
            <View style={styles.ratingRow}>
              {renderStars(item.rating)}
              <Text style={[styles.ratingText, {color: colors.amber}]}>
                {item.rating}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.alertButton, {backgroundColor: colors.tealGreen}]}
          onPress={() => handleAlertVolunteer(item)}
          activeOpacity={0.8}>
          <Icon name="notifications" size={16} color={colors.softWhite} />
          <Text style={[styles.alertButtonText, {color: colors.softWhite}]}>
            Alert Volunteer
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <View style={[styles.tabContainer, {backgroundColor: colors.primary}]}>
      <View style={[styles.miniMap, {backgroundColor: colors.deepNavy}]}>
        <Icon name="map" size={48} color={colors.mutedGray} />
        <Text style={[styles.mapOverlayText, {color: colors.mutedGray}]}>
          Volunteer Locations (Coming Soon)
        </Text>
      </View>
      
      <View style={styles.trackMeContainer}>
        <View style={styles.trackMeInfo}>
          <Icon name="locate" size={20} color={colors.tealGreen} />
          <Text style={[styles.trackMeText, {color: colors.softWhite}]}>
            Allow volunteers to track me
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.trackMeToggle, {backgroundColor: trackMeEnabled ? colors.tealGreen : colors.mutedGray}]}
          onPress={toggleTrackMe}
          activeOpacity={0.8}>
          <View style={[styles.trackMeKnob, {
            transform: [{translateX: trackMeEnabled ? 20 : 0}],
            backgroundColor: colors.softWhite,
          }]} />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={volunteers}
        renderItem={renderVolunteer}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.volunteerList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.tealGreen}
            colors={[colors.tealGreen]}
          />
        }
      />
    </View>
  );
};

// Main CircleScreen with Material Top Tabs
const CircleScreen = () => {
  const {colors} = useTheme();

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.primary}]} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, {color: colors.softWhite}]}>
          My Circle & Community
        </Text>
      </View>

      {/* Material Top Tabs */}
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: colors.deepNavy,
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.tealGreen,
            height: 3,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            textTransform: 'none',
          },
          tabBarActiveTintColor: colors.tealGreen,
          tabBarInactiveTintColor: colors.mutedGray,
          tabBarScrollEnabled: true,
        }}>
        <Tab.Screen 
          name="Emergency" 
          component={EmergencyContactsTab}
          options={{ tabBarLabel: 'Emergency Contacts' }}
        />
        <Tab.Screen 
          name="Tracking" 
          component={ImTrackingTab}
          options={{ tabBarLabel: "I'm Tracking" }}
        />
        <Tab.Screen 
          name="Volunteers" 
          component={VolunteersTab}
          options={{ tabBarLabel: 'Volunteers' }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 20,
    fontWeight: '600',
  },
  // Emergency Contacts Tab Styles
  tabContainer: {
    flex: 1,
  },
  headerInfo: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  onlineText: {
    fontSize: 13,
    fontWeight: '500',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
  },
  contactInfo: {
    flex: 1,
    marginLeft: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
  },
  contactRelation: {
    fontSize: 13,
    marginTop: 2,
  },
  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 12,
  },
  hiddenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    paddingRight: 12,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 0,
  },
  hiddenButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginLeft: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 999,
  },
  callButton: {
    marginRight: 0,
  },
  removeButton: {
    marginRight: 0,
  },
  fab: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  // I'm Tracking Tab Styles
  trackingList: {
    padding: 16,
  },
  trackingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  trackingContent: {
    flex: 1,
    marginLeft: 12,
  },
  trackingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  trackingName: {
    fontSize: 16,
    fontWeight: '600',
  },
  trackingMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  lastSeenText: {
    fontSize: 13,
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
  // Volunteers Tab Styles
  miniMap: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 12,
  },
  mapOverlayText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
  },
  volunteerList: {
    padding: 16,
    paddingTop: 8,
  },
  volunteerCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  volunteerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  volunteerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  volunteerName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  volunteerDist: {
    fontSize: 13,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 6,
  },
  alertButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 6,
  },
  alertButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  trackMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  trackMeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  trackMeText: {
    fontSize: 15,
    fontWeight: '500',
  },
  trackMeToggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    padding: 3,
    justifyContent: 'center',
  },
  trackMeKnob: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
});

export default CircleScreen;
