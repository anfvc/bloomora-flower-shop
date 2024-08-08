import { useContext, useEffect } from "react";
import "./wishlist.css";
import { UserContext } from "../../context/userContext";

function Wishlist() {
  const { user, addToCart, wishList, setWishList, setUser } =
    useContext(UserContext);

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

        body: JSON.stringify({ productId: item.productId._id }),

        /*body: JSON.stringify({ productId: item.productId }),*/

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

  return (
    <>
      <div className="wishlist-container">
        {/* <div className="wishListHeader">
          <h2>Wishlist</h2>
        </div> */}
        <div className="wishListBox">
          {!!wishList?.length &&
            wishList.map((item) => (
              <div className="productsBox" key={item._id}>

                /*<div className="delete" onClick={() => handleDelete(item)}>
                  <p>X</p>
                </div>*/

                <div className="imageBox">
                  <img src={item.image} alt="" width={100} height={100} />
                  <button
                    className="addToCart"
                    onClick={() => addToCart(item, 1)}
                  >
                    add to cart
                  </button>
                </div>
                <div className="info">
                  <p>{item.name}</p>
                  <p>{item.price} €</p>
                </div>


                <div className="deleteButton" onClick={handleDelete}>
                  <button>Delete</button>
                </div>

              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Wishlist;
