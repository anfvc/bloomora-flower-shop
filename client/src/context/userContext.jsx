import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext();

const userProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <UserContext.Provider value={{ user, setUser, setIsLoggedIn, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export default userProvider;
