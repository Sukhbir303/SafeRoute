import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
  Modal,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Animated,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '../context/ThemeContext';
import {useSelectedRoute} from '../context/RouteContext';
import FloatingSOS from '../components/FloatingSOS';

const SearchRouteScreen = ({navigation, recentTrips = [], safeSpots = [], journeyHistory = []}) => {
  const {colors} = useTheme();
  
  // Safely get context with fallback
  let selectedRoute = null;
  let setSelectedRoute = () => {};
  
  try {
    const context = useSelectedRoute();
    selectedRoute = context.selectedRoute;
    setSelectedRoute = context.setSelectedRoute;
  } catch (error) {
    console.warn('RouteContext not available:', error);
  }
  
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [hasDismissedFromPrompt, setHasDismissedFromPrompt] = useState(false);
  const [activeField, setActiveField] = useState(null); // "from" | "to" | null
  const [activeFilter, setActiveFilter] = useState('none'); // 'none' | 'home' | 'work' | 'help' | 'saved'

  // Animated values for route cards
  const scaleAnims = useRef({
    1: new Animated.Value(1),
    2: new Animated.Value(1),
    3: new Animated.Value(1),
  }).current;

  // Derived boolean for showing routes
  const canShowRoutes = fromLocation && toLocation;

  // Mock route data
  const routeOptions = [
    {
      id: 1,
      label: "Safest Route",
      safetyScore: 92,
      distance: "8.2 km",
      time: "18 min",
      lighting: true,
    },
    {
      id: 2,
      label: "Balanced Route",
      safetyScore: 80,
      distance: "7.6 km",
      time: "16 min",
      lighting: true,
    },
    {
      id: 3,
      label: "Fastest Route",
      safetyScore: 65,
      distance: "6.9 km",
      time: "14 min",
      lighting: false,
    },
  ];

  // Placeholder data
  const helpLocations = [
    {id: 1, title: 'Central Police Station', location: 'Main Street', time: '0.5 km'},
    {id: 2, title: 'City Hospital', location: 'Healthcare Blvd', time: '0.8 km'},
    {id: 3, title: 'Emergency Helpline Office', location: 'Safety Ave', time: '1.2 km'},
    {id: 4, title: 'West Police Station', location: 'West End', time: '1.5 km'},
  ];

  const savedAddresses = [
    {id: 1, title: 'Favorite Coffee Shop', location: 'Downtown', time: 'Saved'},
    {id: 2, title: 'Gym', location: 'Sports Complex', time: 'Saved'},
    {id: 3, title: 'Library', location: 'Central District', time: 'Saved'},
  ];

  const handleFromFocus = () => {
    if (!hasDismissedFromPrompt && !fromLocation) {
      setShowLocationModal(true);
    }
    setActiveField('from');
  };

  const handleUseCurrentLocation = () => {
    setFromLocation('Current Location');
    setShowLocationModal(false);
    setHasDismissedFromPrompt(true);
  };

  const handleCloseModal = () => {
    setFromLocation('');
    setShowLocationModal(false);
    setHasDismissedFromPrompt(true);
  };

  const handleFromChange = (text) => {
    setFromLocation(text);
    setSelectedRoute(null);
    if (showLocationModal) {
      setShowLocationModal(false);
      setHasDismissedFromPrompt(true);
    }
  };

  const handleToChange = (text) => {
    setToLocation(text);
    setSelectedRoute(null);
  };

  const handleQuickAction = (address, filterType) => {
    let newFromLocation = fromLocation;
    let newToLocation = toLocation;

    // If activeField is set, fill that specific field
    if (activeField === 'from') {
      setFromLocation(address);
      newFromLocation = address;
    } else if (activeField === 'to') {
      setToLocation(address);
      newToLocation = address;
    } else {
      // No field is active: fill FROM first if empty, otherwise fill TO
      if (!fromLocation || fromLocation === '') {
        setFromLocation(address);
        newFromLocation = address;
      } else {
        setToLocation(address);
        newToLocation = address;
      }
    }
    setActiveFilter(filterType);

    // If both fields are now filled, close keyboard
    if (newFromLocation && newToLocation) {
      Keyboard.dismiss();
      setActiveField(null);
    }
  };

  const handleHomePress = () => {
    handleQuickAction('Home Address', 'home');
  };

  const handleWorkPress = () => {
    handleQuickAction('Workplace', 'work');
  };

  const handleHelpPress = () => {
    setActiveFilter('help');
  };

  const handleSavedPress = () => {
    setActiveFilter('saved');
  };

  const QuickActionButton = ({icon, label, onPress}) => (
    <TouchableOpacity
      style={[styles.quickActionBtn, {backgroundColor: colors.deepNavy || colors.lightGray}]}
      onPress={onPress}
      activeOpacity={0.7}>
      <Text style={styles.quickActionIcon}>{icon}</Text>
      <Text style={[styles.quickActionText, {color: colors.softWhite || colors.charcoal}]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const TripItem = ({title, location, time}) => (
    <View style={[styles.listItem, {borderBottomColor: colors.mutedGray}]}>
      <View style={styles.listItemContent}>
        <Text style={[styles.listItemTitle, {color: colors.softWhite || colors.charcoal}]}>
          {title}
        </Text>
        <Text style={[styles.listItemSubtitle, {color: colors.mutedGray}]}>
          {location} • {time}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.deepNavy || colors.softBlue}]}>
      {/* Header with Close Button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.closeButton, {backgroundColor: colors.mutedGray}]}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}>
          <Text style={[styles.closeButtonText, {color: colors.softWhite}]}>✕</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: colors.softWhite || colors.charcoal}]}>
          Search Route
        </Text>
        <View style={styles.closeButton} />
      </View>

      {/* Fixed Input Section with Gray Background */}
      <View style={[styles.fixedInputSection, {backgroundColor: colors.lightGray || '#e8e8e8'}]}>
        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <View style={[styles.inputRow, {backgroundColor: colors.softWhite || '#ffffff'}]}>
            <Text style={styles.inputLabel}>FROM</Text>
            <TextInput
              style={[styles.inputText, {color: colors.charcoal}]}
              placeholder="Enter start location"
              placeholderTextColor={colors.mutedGray}
              value={fromLocation}
              onChangeText={handleFromChange}
              onFocus={handleFromFocus}
              onBlur={() => setActiveField(null)}
            />
          </View>

          <View style={[styles.inputRow, {backgroundColor: colors.softWhite || '#ffffff'}]}>
            <Text style={styles.inputLabel}>TO</Text>
            <TextInput
              style={[styles.inputText, {color: colors.charcoal}]}
              placeholder="Enter destination"
              placeholderTextColor={colors.mutedGray}
              value={toLocation}
              onChangeText={handleToChange}
              onFocus={() => setActiveField('to')}
              onBlur={() => setActiveField(null)}
            />
          </View>
        </View>

        {/* Horizontal Scroll for Quick Action Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsScrollContent}
          style={styles.chipsContainer}>
          <QuickActionButton icon="🏠" label="Home" onPress={handleHomePress} />
          <QuickActionButton icon="💼" label="Work" onPress={handleWorkPress} />
          <QuickActionButton icon="🚨" label="Help" onPress={handleHelpPress} />
          <QuickActionButton icon="⭐" label="Saved" onPress={handleSavedPress} />
        </ScrollView>

        {/* Route Cards - Show when both fields are filled */}
        {canShowRoutes && (
          <FlatList
            data={routeOptions}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const safetyColor = item.safetyScore >= 85 
                ? colors.safeGreen 
                : item.safetyScore >= 70 
                ? colors.amber 
                : colors.alertRed;
              
              const isSelected = selectedRoute?.id === item.id;
              
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => setSelectedRoute(item)}
                  style={[
                    styles.routeCardHorizontal, 
                    {backgroundColor: colors.lightGray || '#2a2a3e'},
                    isSelected && {
                      borderWidth: 2,
                      borderColor: colors.tealGreen,
                    }
                  ]}
                  activeOpacity={0.9}>
                  <View style={styles.routeCardHeader}>
                    <Text style={[styles.routeCardLabel, {color: colors.softWhite}]}>
                      {item.label}
                    </Text>
                    <View style={[styles.safetyBadge, {backgroundColor: safetyColor}]}>
                      <Text style={[styles.safetyScoreText, {color: colors.softWhite}]}>
                        {item.safetyScore}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.routeCardInfo}>
                    <Text style={[styles.routeCardDistance, {color: colors.mutedGray}]}>
                      {item.distance} • {item.time}
                    </Text>
                  </View>
                  
                  <View style={styles.routeCardFooter}>
                    <Icon 
                      name={item.lighting ? 'lightbulb-on-outline' : 'lightbulb-off-outline'} 
                      size={16} 
                      color={item.lighting ? colors.safeGreen : colors.mutedGray} 
                    />
                    <Text style={[styles.lightingText, {color: item.lighting ? colors.safeGreen : colors.mutedGray, marginLeft: 6}]}>
                      {item.lighting ? 'Well-lit' : 'Low lighting'}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
            contentContainerStyle={{
              paddingHorizontal: 12,
              paddingTop: 4,
              paddingBottom: 12,
            }}
            style={{
              flexGrow: 0,
              height: 150,
              marginTop: 12,
            }}
          />
        )}

        {/* Divider */}
        <View style={[styles.divider, {backgroundColor: colors.mutedGray || '#d0d0d0'}]} />
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        {/* Route Suggestions - Removed vertical list, keeping only horizontal cards above */}
        
        {/* Status Row */}
        <View style={styles.statusRow}>
          <View style={[styles.statusBadge, {backgroundColor: colors.safeGreen}]}>
            <Text style={[styles.statusText, {color: colors.softWhite}]}>Safe Zone</Text>
          </View>
          <Text style={[styles.contactsText, {color: colors.mutedGray}]}>
            3 contacts online
          </Text>
        </View>

        {/* HOME Filter - Show only Home suggestion */}
        {activeFilter === 'home' && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, {color: colors.softWhite || colors.charcoal}]}>
              Home
            </Text>
            <TripItem title="Home Address" location="Your saved home location" time="Saved" />
          </View>
        )}

        {/* WORK Filter - Show only Work suggestion */}
        {activeFilter === 'work' && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, {color: colors.softWhite || colors.charcoal}]}>
              Work
            </Text>
            <TripItem title="Workplace" location="Your saved work location" time="Saved" />
          </View>
        )}

        {/* HELP Filter - Show emergency services */}
        {activeFilter === 'help' && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, {color: colors.softWhite || colors.charcoal}]}>
              Emergency Services
            </Text>
            {helpLocations.map(item => (
              <TripItem key={item.id} title={item.title} location={item.location} time={item.time} />
            ))}
          </View>
        )}

        {/* SAVED Filter - Show saved addresses (excluding Home/Work) */}
        {activeFilter === 'saved' && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, {color: colors.softWhite || colors.charcoal}]}>
              Saved Places
            </Text>
            {savedAddresses.map(item => (
              <TripItem key={item.id} title={item.title} location={item.location} time={item.time} />
            ))}
          </View>
        )}

        {/* DEFAULT (none) - Show Recent Trips + Safe Spots + Nearby */}
        {activeFilter === 'none' && (
          <>
            {/* Recent Trips */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, {color: colors.softWhite || colors.charcoal}]}>
                Recent Trips
              </Text>
              <TripItem title="Evening Commute" location="Downtown → Home" time="2 hours ago" />
              <TripItem title="Coffee Shop" location="Main St. Cafe" time="5 hours ago" />
              <TripItem title="Grocery Run" location="SuperMart Plaza" time="Yesterday" />
            </View>

            {/* Safe Spots */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, {color: colors.softWhite || colors.charcoal}]}>
                Nearby Safe Spots
              </Text>
              <TripItem title="Police Station" location="Central Ave" time="0.3 km" />
              <TripItem title="Hospital" location="Healthcare Blvd" time="0.8 km" />
              <TripItem title="Fire Station" location="Safety St" time="1.2 km" />
            </View>
          </>
        )}

        {/* Report Incident Button */}
        <TouchableOpacity
          style={[styles.reportButton, {backgroundColor: colors.alertRed}]}
          activeOpacity={0.8}>
          <Text style={[styles.reportButtonText, {color: colors.softWhite}]}>
            🚨 Report Incident
          </Text>
        </TouchableOpacity>

        {/* Journey History */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: colors.softWhite || colors.charcoal}]}>
            Journey History
          </Text>
          <TripItem title="Home → Office" location="Jan 8, 2026" time="25 min" />
          <TripItem title="Office → Gym" location="Jan 8, 2026" time="15 min" />
          <TripItem title="Gym → Home" location="Jan 7, 2026" time="30 min" />
        </View>

        {/* Additional Options */}
        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.optionButton, {backgroundColor: colors.tealGreen}]}
            activeOpacity={0.8}>
            <Text style={[styles.optionButtonText, {color: colors.softWhite}]}>
              📍 Offline Maps
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionButton, {backgroundColor: colors.amber, marginTop: 12}]}
            activeOpacity={0.8}>
            <Text style={[styles.optionButtonText, {color: colors.softWhite}]}>
              🛡️ Safety Resources
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bottom padding for SOS button */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Floating SOS Button */}
      <View style={styles.sosContainer}>
        <FloatingSOS />
      </View>

      {/* Use Live Location Modal */}
      <Modal
        visible={showLocationModal}
        transparent
        animationType="fade"
        onRequestClose={handleCloseModal}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}>
          <View style={[styles.modalContent, {backgroundColor: colors.deepNavy || colors.softWhite}]}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={handleCloseModal}
              activeOpacity={0.7}>
              <Text style={[styles.modalCloseText, {color: colors.softWhite || colors.charcoal}]}>
                ✕
              </Text>
            </TouchableOpacity>
            <Text style={[styles.modalTitle, {color: colors.softWhite || colors.charcoal}]}>
              Use Live Location
            </Text>
            <TouchableOpacity
              style={[styles.modalButton, {backgroundColor: colors.safeGreen}]}
              onPress={handleUseCurrentLocation}
              activeOpacity={0.8}>
              <Text style={[styles.modalButtonText, {color: colors.softWhite}]}>
                Use My Current Location
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  fixedInputSection: {
    paddingBottom: 12,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    gap: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#888',
    width: 50,
  },
  inputText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },
  chipsContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  chipsScrollContent: {
    gap: 8,
    paddingRight: 16,
  },
  divider: {
    height: 1,
    width: '100%',
    opacity: 0.3,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 120, // Extra space for SOS button
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  contactsText: {
    fontSize: 13,
  },
  quickActionBtn: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 18,
    minWidth: 85,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quickActionIcon: {
    fontSize: 22,
    marginBottom: 3,
  },
  quickActionText: {
    fontSize: 10,
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  listItem: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
  },
  listItemContent: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  listItemSubtitle: {
    fontSize: 13,
  },
  reportButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  reportButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
  optionButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  optionButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 40,
  },
  sosContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 150,
  },
  modalContent: {
    width: '80%',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    position: 'relative',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  modalCloseText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
    marginTop: 12,
  },
  modalButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  routeCardsContainer: {
    marginTop: 12,
    marginBottom: 8,
    flexGrow: 0,
  },
  routeCardsScrollContent: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingVertical: 4,
  },
  routeCardHorizontal: {
    width: Dimensions.get('window').width * 0.8,
    padding: 16,
    borderRadius: 18,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  routeCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  routeCardLabel: {
    fontSize: 16,
    fontWeight: '700',
  },
  safetyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    minWidth: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  safetyScoreText: {
    fontSize: 13,
    fontWeight: '700',
  },
  routeCardInfo: {
    marginBottom: 8,
  },
  routeCardDistance: {
    fontSize: 14,
    fontWeight: '500',
  },
  routeCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lightingText: {
    fontSize: 13,
    fontWeight: '600',
  },
  routeCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  routeBadge: {
    fontSize: 14,
    fontWeight: '700',
  },
  routeTime: {
    fontSize: 16,
    fontWeight: '700',
  },
  routeDescription: {
    fontSize: 13,
    marginBottom: 10,
    lineHeight: 18,
  },
  routeStats: {
    flexDirection: 'row',
    gap: 12,
  },
  routeStat: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default SearchRouteScreen;
