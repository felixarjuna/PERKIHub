import React from 'react';
import { User } from './lib/api/contracts';
import Root from './routes/Root';

interface CurrentUserContextType {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const CurrentUserContext = React.createContext<CurrentUserContextType | null>(
  null
);

function App() {
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Root />;
    </CurrentUserContext.Provider>
  );
}

export default App;
