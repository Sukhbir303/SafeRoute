import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import {useTheme} from '../context/ThemeContext';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const COLLAPSED_HEIGHT = SCREEN_HEIGHT * 0.2;
const HALF_HEIGHT = SCREEN_HEIGHT * 0.5;
const FULL_HEIGHT = SCREEN_HEIGHT * 0.9;

const BottomPanel = ({recentTrips = [], safeSpots = [], journeyHistory = []}) => {
  const {colors} = useTheme();
  const [panelHeight] = useState(new Animated.Value(COLLAPSED_HEIGHT));
  const [currentSnap, setCurrentSnap] = useState(0); // 0: collapsed, 1: half, 2: full

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const newHeight = COLLAPSED_HEIGHT - gestureState.dy;
      if (newHeight >= COLLAPSED_HEIGHT && newHeight <= FULL_HEIGHT) {
        panelHeight.setValue(newHeight);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      const currentHeight = COLLAPSED_HEIGHT - gestureState.dy;
      
      let targetHeight = COLLAPSED_HEIGHT;
      let snapIndex = 0;
      
      if (currentHeight > (COLLAPSED_HEIGHT + HALF_HEIGHT) / 2 && currentHeight < (HALF_HEIGHT + FULL_HEIGHT) / 2) {
        targetHeight = HALF_HEIGHT;
        snapIndex = 1;
      } else if (currentHeight >= (HALF_HEIGHT + FULL_HEIGHT) / 2) {
        targetHeight = FULL_HEIGHT;
        snapIndex = 2;
      }
      
      Animated.spring(panelHeight, {
        toValue: targetHeight,
        useNativeDriver: false,
      }).start();
      setCurrentSnap(snapIndex);
    },
  });

  const QuickActionButton = ({icon, label}) => (
    <TouchableOpacity
      style={[styles.quickActionBtn, {backgroundColor: colors.deepNavy || colors.lightGray}]}
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
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: colors.deepNavy || colors.softBlue,
          height: panelHeight,
        },
      ]}>
      {/* Drag Handle */}
      <View {...panResponder.panHandlers} style={styles.handleContainer}>
        <View style={[styles.handle, {backgroundColor: colors.mutedGray}]} />
      </View>

      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Collapsed View - Always visible */}
        <View style={styles.collapsedSection}>
          <View style={styles.statusRow}>
            <View style={[styles.statusBadge, {backgroundColor: colors.safeGreen}]}>
              <Text style={[styles.statusText, {color: colors.softWhite}]}>Safe Zone</Text>
            </View>
            <Text style={[styles.contactsText, {color: colors.mutedGray}]}>
              3 contacts online
            </Text>
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActionsRow}>
            <QuickActionButton icon="🏠" label="Home" />
            <QuickActionButton icon="💼" label="Work" />
            <QuickActionButton icon="🚨" label="Help" />
            <QuickActionButton icon="⭐" label="Saved" />
          </View>
        </View>

        {/* Half Expanded Content */}
        {currentSnap >= 1 && (
          <View style={styles.halfSection}>
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

            {/* Report Incident Button */}
            <TouchableOpacity
              style={[styles.reportButton, {backgroundColor: colors.alertRed}]}
              activeOpacity={0.8}>
              <Text style={[styles.reportButtonText, {color: colors.softWhite}]}>
                🚨 Report Incident
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Full Expanded Content */}
        {currentSnap >= 2 && (
          <View style={styles.fullSection}>
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
          </View>
        )}
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  collapsedSection: {
    marginBottom: 16,
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
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  quickActionBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
  },
  quickActionIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  quickActionText: {
    fontSize: 11,
    fontWeight: '500',
  },
  halfSection: {
    marginTop: 8,
  },
  fullSection: {
    marginTop: 8,
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
    marginTop: 8,
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
});

export default BottomPanel;
