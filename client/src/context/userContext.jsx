import React, { useState, createContext, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const [sortedProducts, setSortedProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]); // Original products to reset sorting
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [list, setList] = useState([]);


  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(`http://localhost:5100/api/product/show/all`);
        if (response.ok) {
          const data = await response.json();
          setSortedProducts(data);
          setOriginalProducts(data);
        } else {
          const { error } = await response.json();
          throw new Error(error.message);
        }
      } catch (error) {
        alert(error.message);
      }
    }
    fetchProducts();
  }, []);

  const sortAlphabeticallyAZ = () => {
    const sorted = [...sortedProducts].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setSortedProducts(sorted);
  };

  const sortAlphabeticallyZA = () => {
    const sorted = [...sortedProducts].sort((a, b) =>
      b.name.localeCompare(a.name)
    );
    setSortedProducts(sorted);
  };

  const sortByPriceLowToHigh = () => {
    const sorted = [...sortedProducts].sort(
      (a, b) => parseFloat(a.price) - parseFloat(b.price)
    );
    setSortedProducts(sorted);
  };

  const sortByPriceHighToLow = () => {
    const sorted = [...sortedProducts].sort(
      (a, b) => parseFloat(b.price) - parseFloat(a.price)
    );
    setSortedProducts(sorted);
  };

  const resetSorting = () => {
    setSortedProducts(originalProducts);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        logout,
        sortedProducts,
        sortAlphabeticallyAZ,
        sortAlphabeticallyZA,
        sortByPriceLowToHigh,
        sortByPriceHighToLow,
        resetSorting,
        setIsMenuOpen,
        isMenuOpen,
        setSortedProducts,
        list,
        setList
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
