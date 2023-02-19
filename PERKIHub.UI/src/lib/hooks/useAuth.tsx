import React from 'react';
import { User } from '../api/contracts';

interface CurrentUserContextType {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface useAuthProps {
  children: React.ReactNode;
}

const CurrentUserContext = React.createContext<CurrentUserContextType | null>(
  null
);

export const AuthProvider = ({ children }: useAuthProps) => {
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(CurrentUserContext);
};
