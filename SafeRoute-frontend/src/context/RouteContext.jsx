import React, {createContext, useContext, useState} from 'react';

const RouteContext = createContext();

export const RouteProvider = ({children}) => {
  const [selectedRoute, setSelectedRoute] = useState(null);

  return (
    <RouteContext.Provider value={{selectedRoute, setSelectedRoute}}>
      {children}
    </RouteContext.Provider>
  );
};

export const useSelectedRoute = () => {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error('useSelectedRoute must be used within RouteProvider');
  }
  return context;
};
