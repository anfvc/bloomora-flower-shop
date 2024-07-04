import React, { useState, createContext } from "react";
import { products } from "../data.js";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [sortedProducts, setSortedProducts] = useState(products[0].artificial);

  const sortAlphabeticallyAZ = () => {
    const sorted = [...sortedProducts].sort((a, b) => a.name.localeCompare(b.name));
    setSortedProducts(sorted);
  };

  const sortAlphabeticallyZA = () => {
    const sorted = [...sortedProducts].sort((a, b) => b.name.localeCompare(a.name));
    setSortedProducts(sorted);
  };

  const sortByPriceLowToHigh = () => {
    const sorted = [...sortedProducts].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    setSortedProducts(sorted);
  };

  const sortByPriceHighToLow = () => {
    const sorted = [...sortedProducts].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    setSortedProducts(sorted);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, sortedProducts, sortAlphabeticallyAZ, sortAlphabeticallyZA, sortByPriceLowToHigh, sortByPriceHighToLow }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
