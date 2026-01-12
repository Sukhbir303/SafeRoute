import {useState} from 'react';

const useHomeState = () => {
  // Filter states
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showVolunteers, setShowVolunteers] = useState(false);
  const [showIncidents, setShowIncidents] = useState(false);

  // Toggle functions
  const toggleHeatmap = () => setShowHeatmap(prev => !prev);
  const toggleVolunteers = () => setShowVolunteers(prev => !prev);
  const toggleIncidents = () => setShowIncidents(prev => !prev);

  // Mock Data - Recent Trips
  const recentTrips = [
    {
      id: 1,
      title: 'Evening Commute',
      location: 'Downtown → Home',
      time: '2 hours ago',
    },
    {
      id: 2,
      title: 'Coffee Shop',
      location: 'Main St. Cafe',
      time: '5 hours ago',
    },
    {
      id: 3,
      title: 'Grocery Run',
      location: 'SuperMart Plaza',
      time: 'Yesterday',
    },
  ];

  // Mock Data - Safe Spots
  const safeSpots = [
    {
      id: 1,
      name: 'Police Station',
      address: 'Central Ave',
      distance: '0.3 km',
    },
    {
      id: 2,
      name: 'Hospital',
      address: 'Healthcare Blvd',
      distance: '0.8 km',
    },
    {
      id: 3,
      name: 'Fire Station',
      address: 'Safety St',
      distance: '1.2 km',
    },
  ];

  // Mock Data - Journey History
  const journeyHistory = [
    {
      id: 1,
      route: 'Home → Office',
      date: 'Jan 8, 2026',
      duration: '25 min',
      status: 'completed',
    },
    {
      id: 2,
      route: 'Office → Gym',
      date: 'Jan 8, 2026',
      duration: '15 min',
      status: 'completed',
    },
    {
      id: 3,
      route: 'Gym → Home',
      date: 'Jan 7, 2026',
      duration: '30 min',
      status: 'completed',
    },
  ];

  return {
    // Filter states
    showHeatmap,
    showVolunteers,
    showIncidents,
    
    // Toggle functions
    toggleHeatmap,
    toggleVolunteers,
    toggleIncidents,
    
    // Mock data
    recentTrips,
    safeSpots,
    journeyHistory,
  };
};

export default useHomeState;
