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
    category: "",
  });
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(() => {
    checkUserAuth();
  }, []);

  async function checkUserAuth() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/user/refreshuser`,
        { credentials: "include" }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setIsLoggedIn(true);
        setUser(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  // filter part
  function handleFilter(e) {
    setFilter({ ...filter, category: e.target.value });
  }

  useEffect(() => {
    async function fetchProducts() {
      try {
        let response;
        if (!filter.category) {
          response = await fetch(
            `${import.meta.env.VITE_API}/product/show/all`
          );
        } else
          response = await fetch(
            `${import.meta.env.VITE_API}/product/show/filtered/all?category=${
              filter.category
            }`
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

  //* addToCart is in userContext as it can be used in other places:
  async function addToCart(product, quantity) {
    try {
      const settings = {
        method: "POST",
        headers: {
          "Content-Type": "application/JSON",
        },
        body: JSON.stringify({
          productId: product._id,
          quantity,
        }),
      };

      const response = await fetch(
        `${import.meta.env.VITE_API}/cart/add/${user.user._id}`,
        settings
      );

      if (response.ok) {
        const newCart = await response.json();
        console.log(newCart);
        setUser({ ...user, cart: newCart });
        alert("Item added to the cart.");
      } else {
        const { error } = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      console.log("Error adding product to cart.");
    }
  }

  // async function removeFromCart(product) {
  //   try {
  //     const settings = {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/JSON",
  //       },
  //       body: JSON.stringify({
  //         productId: product._id
  //       }),
  //     };

  //     const response = await fetch(
  //       `http://localhost:5100/api/cart/remove/${user.user._id}`,
  //       settings
  //     );

  //     if (response.ok) {
  //       const newCart = await response.json();
  //       console.log(newCart);
  //       setUser({ ...user, cart: newCart });
  //     } else {
  //       const { error } = await response.json();
  //       throw new Error(error.message);
  //     }
  //   } catch (error) {
  //     console.log("Error adding product to cart.");
  //   }
  // }

  const handleDelete = async (itemId) => {
    try {
      const settings = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: itemId }), // Burada parantez hatası düzeltilmiş
      };

      const response = await fetch(
        `${import.meta.env.VITE_API}/cart/remove/${user.user._id}`,
        settings
      );

      if (response.ok) {
        const updatedCart = await response.json();
        setCart(updatedCart);
      } else {
        const { error } = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  async function addToWishList(product) {
    try {
      const settings = {
        method: "POST",
        headers: {
          "Content-Type": "application/JSON",
        },
        body: JSON.stringify({
          productId: product._id,
        }),
      };

      const response = await fetch(
        `${import.meta.env.VITE_API}/wishlist/add/${user.user._id}`,
        settings
      );

      if (response.ok) {
        const updatedWishlist = await response.json();
        console.log(updatedWishlist);
      } else {
        const { error } = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      console.log("Error adding product to wishlist.");
    }
  }

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

  const logout = async () => {
    try {
      const settings = {
        method: "POST",
        credentials: "include",
      };
      const response = await fetch(
        `${import.meta.env.VITE_API}/auth/logout`,
        settings
      );
      if (response.ok) {
        const data = await response.json();
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
        addToCart,
        addToWishList,
        // removeFromCart,
        cart,
        setCart,
        handleDelete,
        checkUserAuth,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
