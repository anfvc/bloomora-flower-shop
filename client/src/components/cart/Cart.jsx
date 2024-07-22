import { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { UserContext } from "../../context/userContext";
import { MdOutlineDelete } from "react-icons/md";
import { LiaShippingFastSolid } from "react-icons/lia";
import { GiReturnArrow } from "react-icons/gi";
import { RiSecurePaymentLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";

function Cart() {
  const { t } = useTranslation();
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
        <h1>{t("cart.header")}</h1>
      </div>
      {cart.length === 0 ? <p>{t("cart.cartLength")}</p> 
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
                <p>{t("cart.quantity")}: <span>{item.quantity}</span></p>
                <p>{t("cart.price")}: <span>{item.productPrice} €</span></p>
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
            <p>{t("cart.subTotal")} :</p> <span>{total().toFixed(2)} €</span>
          </div>
          <div className="shipping">
            <p>{t("cart.shipping")} :</p>
            <span>{t("cart.free")}</span>
          </div>
          <div className="vat">
            <p>{t("cart.vat")} :</p>
            <span>{t("cart.included")}</span>
          </div>
        </div>
        <div className="totalPayment-Buttons">
          <div className="totalPayment">
            <h2>{t("cart.totalToPay")}:</h2>
            <p>{total().toFixed(2)}€</p>
          </div>
          <div className="paymentButtons">
            <button className="checkOut">{t("cart.checkout")}</button>
            <p>{t("cart.or")}</p>
            <button className="paypal">{t("cart.paypal")}</button>
          </div>
        </div>
        <div className="secure-return-logged">
          <div className="logged">
            <LiaShippingFastSolid />
            <p>{t("cart.freeShipping")}</p>
          </div>
          <div className="return">
            <GiReturnArrow />
            <p>{t("cart.freeReturns")}</p>
          </div>
          <div className="secure">
            <RiSecurePaymentLine />
            <p>{t("cart.secureCheckout")}</p>
          </div>
        </div>
      </div>
    </div>}
    </div>
  );
}

export default Cart;
