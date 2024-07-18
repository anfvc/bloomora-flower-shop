import React, { useState, createContext, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [sortedProducts, setSortedProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [list, setList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [filter, setFilter] = useState({
    // sortby: "name",
    // sortdir: "",
    category: "",
  });


  useEffect(()=>{
    async function checkUserAuth(){
      try {
        const response = await fetch(`http://localhost:5100/api/auth/refreshuser`,{credentials: "include"})
        if(response.ok){
          const data = await response.json()
          console.log(data);
          setIsLoggedIn(true);
          setUser(data)
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    checkUserAuth()
  },[])

  // filter part
  function handleFilter(e) {
    setFilter({ ...filter, category: e.target.value });
  }

  useEffect(() => {
    async function fetchProducts() {
      try {
        let response;
        if (!filter.category) {
          response = await fetch(`http://localhost:5100/api/product/show/all`);

        } else
          response = await fetch(
            `http://localhost:5100/api/product/show/filtered/all?category=${filter.category}`
          );

        if (response.ok) {
          const data = await response.json();
          setSortedProducts(data);
          setOriginalProducts(data);
        } else {
          const { error } = await response.json();
          throw new Error(error.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchProducts();
  }, [filter.category]);

  // Arama işlevi
  const searchProducts = (query) => {
    if (!query) {
      setFilteredProducts([]);
      return;
    }
    const filtered = sortedProducts.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

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

   const logout = async() => {
    try {
      const settings = {
        method: "POST",
        credentials: "include"
      }
      const response = await fetch(`http://localhost:5100/api/auth/logout`, settings)
      if(response.ok){
        const data = await response.json()
        setUser(data);
        setIsLoggedIn(false);
        console.log(user);
      }
    } catch (error) {
      
      console.log(error.message); 
    }
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
        setList,
        filteredProducts, 
        searchProducts, 
        filter,
        setFilter,
        handleFilter,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
