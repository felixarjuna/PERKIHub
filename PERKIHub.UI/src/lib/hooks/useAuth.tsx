import { isEmpty } from "lodash";
import React from "react";
import { User } from "../api/contracts";

interface CurrentUserContextType {
  currentUser: User | null;
  onChangeUser: (user: User | null) => void;
}

interface useAuthProps {
  children: React.ReactNode;
}

const CurrentUserContext = React.createContext<CurrentUserContextType | null>(
  null
);

export const AuthProvider = ({ children }: useAuthProps) => {
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);

  const onChangeUser = (user: User | null) => {
    localStorage.setItem("user", JSON.stringify(user));
    setCurrentUser(user);
  };

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "[]");
    if (!isEmpty(user)) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, onChangeUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useAuth = () => {
  const currentUserContext = React.useContext(CurrentUserContext);
  if (currentUserContext == null) {
    throw new Error("Use Context under the provider");
  }

  return currentUserContext;
};
