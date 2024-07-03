import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext();

const userProvider = ({ children }) => {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default userProvider;
