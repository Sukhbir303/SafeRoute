import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {useTheme} from '../context/ThemeContext';

const MapFilters = ({
  showHeatmap,
  showVolunteers,
  showIncidents,
  toggleHeatmap,
  toggleVolunteers,
  toggleIncidents,
}) => {
  const {colors} = useTheme();

  const FilterButton = ({label, color, isActive, onPress}) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        {
          backgroundColor: isActive ? color : colors.lightGray || colors.deepNavy,
          borderColor: color,
          borderWidth: isActive ? 2 : 1,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}>
      <Text
        style={[
          styles.filterText,
          {
            color: isActive ? colors.softWhite || colors.charcoal : colors.mutedGray,
            fontWeight: isActive ? 'bold' : 'normal',
          },
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FilterButton
        label="Heatmap"
        color={colors.amber}
        isActive={showHeatmap}
        onPress={toggleHeatmap}
      />
      <FilterButton
        label="Volunteers"
        color={colors.safeGreen}
        isActive={showVolunteers}
        onPress={toggleVolunteers}
      />
      <FilterButton
        label="Incidents"
        color={colors.dangerRed}
        isActive={showIncidents}
        onPress={toggleIncidents}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filterText: {
    fontSize: 13,
    textAlign: 'center',
  },
});

MapFilters.propTypes = {
  showHeatmap: PropTypes.bool.isRequired,
  showVolunteers: PropTypes.bool.isRequired,
  showIncidents: PropTypes.bool.isRequired,
  toggleHeatmap: PropTypes.func.isRequired,
  toggleVolunteers: PropTypes.func.isRequired,
  toggleIncidents: PropTypes.func.isRequired,
};

export default MapFilters;
