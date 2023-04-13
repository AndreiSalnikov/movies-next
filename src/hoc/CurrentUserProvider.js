import {createContext, useState} from 'react';

export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  const value = {user, setUser, isLoading, setIsLoading};

  return <CurrentUserContext.Provider value={value}>
    {children}
  </CurrentUserContext.Provider>

}
