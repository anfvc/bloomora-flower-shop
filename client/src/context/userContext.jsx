import { useState, createContext, useEffect } from "react";
import { useAlert } from "./alertContext";
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [sortedProducts, setSortedProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [list, setList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [filter, setFilter] = useState({
    category: "",
  });
  const [cart, setCart] = useState(
    user.cart || [] //*This returns the current cart of the logged in user. Value that is stored in Backend
  );
  const [orders, setOrders] = useState(user.orders || []);

  // const [deliveryAddress, setDeliveryAddress] = useState({
  //   firstName: orders.deliveryAddress?.firstName,
  //   lastName: orders.deliveryAddress?.lastName,
  //   street: orders.deliveryAddress?.street,
  //   houseNum: orders.deliveryAddress?.houseNum,
  //   zip: orders.deliveryAddress?.zip,
  //   city: orders.deliveryAddress?.city,
  //   country: orders.deliveryAddress?.country,
  // });

  const [deliveryAddress, setDeliveryAddress] = useState({
    firstName: "",
    lastName: "",
    street: "",
    houseNum: "",
    zip: "",
    city: "",
    country: "",
  });

  const [orderId, setOrderId] = useState(null);

  const { showAlert } = useAlert();

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
        // console.log(data);
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
          // console.log(data);
          
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
        // console.log(newCart);
        setUser({ ...user, cart: newCart });
        showAlert(`${product.name} has been added to the cart.`, "success");
      } else {
        const { error } = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      console.log("Error adding product to cart.");
    }
  }

  const handleDelete = async (item) => {
    try {
      const settings = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: item.productId._id }),
      };
      const response = await fetch(
        `${import.meta.env.VITE_API}/cart/remove/${user.user._id}`,
        settings
      );

      if (response.ok) {
        const updatedUser = await response.json();
        // console.log(updatedUser);
        setUser(updatedUser);
        setCart(updatedUser.user.cart);
      } else {
        const { message } = await response.json();
        throw new Error(message);
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

  // const sortAlphabeticallyAZ = () => {
  //   const sorted = [...sortedProducts].sort((a, b) =>
  //     a.name.localeCompare(b.name)
  //   );
  //   setSortedProducts(sorted);
  // };

  // const sortAlphabeticallyZA = () => {
  //   const sorted = [...sortedProducts].sort((a, b) =>
  //     b.name.localeCompare(a.name)
  //   );
  //   setSortedProducts(sorted);
  // };

  // const sortByPriceLowToHigh = () => {
  //   const sorted = [...sortedProducts].sort(
  //     (a, b) => parseFloat(a.price) - parseFloat(b.price)
  //   );
  //   setSortedProducts(sorted);
  // };

  // const sortByPriceHighToLow = () => {
  //   const sorted = [...sortedProducts].sort(
  //     (a, b) => parseFloat(b.price) - parseFloat(a.price)
  //   );
  //   setSortedProducts(sorted);
  // };

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
        showAlert(`You have logged out!`);
        console.log(data);
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
        // sortAlphabeticallyAZ,
        // sortAlphabeticallyZA,
        // sortByPriceLowToHigh,
        // sortByPriceHighToLow,
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
        wishList,
        setWishList,
        cart,
        setCart,
        handleDelete,
        checkUserAuth,
        orders,
        setOrders,
        deliveryAddress,
        setDeliveryAddress,
        orderId,
        setOrderId,

      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
