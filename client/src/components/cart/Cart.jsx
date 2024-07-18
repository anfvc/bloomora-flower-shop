import { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { UserContext } from "../../context/userContext";

function Cart() {
  const { user, removeFromCart } = useContext(UserContext);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(
    () => {
      async function getCart() {
        try {
          const response = await fetch(
            `http://localhost:5100/api/cart/get/${user.user._id}`
          );

          if (response.ok) {
            const data = await response.json();
            // console.log(`Trying to see how to access this data, ${data}`);
            console.table(data); //Adding console.table to see check out data
            setCart(data);
          } else {
            const { error } = await response.json();
            throw new Error(error.message);
          }
        } catch (error) {
          console.log(error.message);
        }
      }
      getCart();
    },
    [/* user.user._id */]
  ); //Commenting out this dependency

  //* Calculating total of cart:
  function total() {
    return cart.reduce(
      (acc, current) => acc + current.productPrice * current.quantity,
      0
    );
  }

  useEffect(() => {
    const savedCart = localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      <div className="items-container">
        {!!cart.length > 0 &&
          cart.map((item) => (
            <div className="productsBox" key={item._id}>
              <div className="imageBox">
                <img src={item.productImage} alt="" width={100} height={100} />
              </div>
              <div className="info">
                <p>{item.productName}</p>
                <p>{item.productPrice}€</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
      </div>
      <div>
        <h2>Total to Pay: {total().toFixed(2)}€</h2>
      </div>
    </div>
  );
}

export default Cart;
