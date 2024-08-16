import { useContext, useEffect } from "react";
import "./wishlist.css";
import { UserContext } from "../../context/userContext";
import { useTranslation } from "react-i18next";
import { useAlert } from "../../context/alertContext";


function Wishlist() {
  const { user, /* addToCart, */ wishList, setWishList, setUser } =
    useContext(UserContext);
    const { t } = useTranslation();
    const { showAlert } = useAlert();

  useEffect(() => {
    async function getWishList() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API}/wishlist/get/${user.user._id}`
        );

        if (response.ok) {
          const data = await response.json();
          setWishList(data);
          // console.log(`wishlist, ${data}`);
        } else {
          const { error } = await response.json();
          throw new Error(error.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    getWishList();
  }, [user.user?._id, user.user.wishlist]);

  const handleDelete = async (item) => {
    try {
      const settings = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ productId: item.productId }),
      };
      const response = await fetch(
        `${import.meta.env.VITE_API}/wishlist/delete/${user.user._id}`,
        settings
      );

      if (response.ok) {
        const updatedUser = await response.json();

        console.log(updatedUser);
        setUser(updatedUser);
        setWishList(updatedUser.user.wishList);

        /*setUser(updatedUser);
        setWishList(updatedUser.user.wishList);
        console.log(updatedUser);*/
      } else {
        const { message } = await response.json();
        throw new Error(message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  async function addToCart(product, quantity) {
    try {
      const settings = {
        method: "POST",
        headers: {
          "Content-Type": "application/JSON",
        },
        body: JSON.stringify({
          productId: product.productId,
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

  return (
    <>
      <div className="wishlist-container">
        <div className="wishListHeader">
          <h2>Wishlist</h2>
        </div>
        <div className="wishListBox">
          {!!wishList?.length &&
            wishList.map((item) => (
              <div className="productsBox" key={item._id}>
                <div className="imageBox">
                  <img src={item.image} alt="" width={100} height={100} />
                                  
                  <button
                    className="addToCart"
                    onClick={ ()=>addToCart(item, 1)}
                  >
                    {t("shop.addToCart")}
                  </button>
                </div>
                <div className="info">
                  <p>{item.name}</p>
                  <p>{item.price} €</p>
                  
                </div>
                <div
                  className="deleteButton"
                  onClick={() => handleDelete(item)}
                >
                  <button>{t("delete")}</button>
                </div>
                
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Wishlist;
