import { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { UserContext } from "../../context/userContext";
import { MdOutlineDelete } from "react-icons/md";
import { LiaShippingFastSolid } from "react-icons/lia";
import { GiReturnArrow } from "react-icons/gi";
import { RiSecurePaymentLine } from "react-icons/ri";

function Cart() {
  const { user, removeFromCart } = useContext(UserContext);
  const [ isCartEmpty, setIsCartEmpty ] = useState(false);
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
    [
      /* user.user._id */
    ]
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
      <div className="background"></div>
      <div className="cartHeader">
        <h1>cart</h1>
      </div>
      {cart.length === 0 ? <p>your cart is empty</p> 
      : <div className="itemsPaymentsContainer">
      <div className="itemsContainer">
        {!!cart.length > 0 &&
          cart.map((item) => (
            <div className="productsBox" key={item._id}>
              <div className="imageBox">
                <img
                  src={item.productImage}
                  alt=""
                  width={100}
                  height={100}
                />
              </div>
              <div className="info">
                <p>{item.productName}</p>
                <p>Quantity: <span>{item.quantity}</span></p>
                <p>Price: <span>{item.productPrice} €</span></p>
              </div>
              <div className="incDecDelete">
                <div className="incDec">
                  <button className="inc">+</button>
                  <p>{item.quantity}</p>
                  <button className="dec">-</button>
                </div>
                <div className="delete">
                  <MdOutlineDelete className="dlt" />
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="paymentContainer">
        <div className="shipment-subTotal-vat">
          <div className="subTotal">
            <p>order subtotal :</p> <span>{total().toFixed(2)} €</span>
          </div>
          <div className="shipping">
            <p>shipping "STANDARD" :</p>
            <span>free</span>
          </div>
          <div className="vat">
            <p>vat :</p>
            <span>included</span>
          </div>
        </div>
        <div className="totalPayment-Buttons">
          <div className="totalPayment">
            <h2>Total to Pay:</h2>
            <p>{total().toFixed(2)}€</p>
          </div>
          <div className="paymentButtons">
            <button className="checkOut">go to checkout</button>
            <p>or</p>
            <button className="paypal">paypal</button>
          </div>
        </div>
        <div className="secure-return-logged">
          <div className="logged">
            <LiaShippingFastSolid />
            <p>free shipping for logged-in user</p>
          </div>
          <div className="return">
            <GiReturnArrow />
            <p>free returns for 30 days</p>
          </div>
          <div className="secure">
            <RiSecurePaymentLine />
            <p>secure checkout</p>
          </div>
        </div>
      </div>
    </div>}
    </div>
  );
}

export default Cart;
