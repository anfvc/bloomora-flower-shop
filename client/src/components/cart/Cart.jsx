import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import Modal from "../Modal/Modal";
import { UserContext } from "../../context/userContext";
import { MdOutlineDelete } from "react-icons/md";
import { LiaShippingFastSolid } from "react-icons/lia";
import { GiReturnArrow } from "react-icons/gi";
import { RiSecurePaymentLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import { useAlert } from "../../context/alertContext";

function Cart() {
  const { t } = useTranslation();
  const {
    user,
    setUser,
    cart,
    setCart,
    handleDelete,
    deliveryAddress,
    setDeliveryAddress,
    orderId,
    setOrderId,
  } = useContext(UserContext);
  const { showAlert } = useAlert();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function getCart() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API}/cart/get/${user.user._id}`
        );

        if (response.ok) {
          const data = await response.json();
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
  }, [user.user?._id, user.user?.cart]);

  function total() {
    return cart.reduce(
      (acc, current) => acc + current.productPrice * current.quantity,
      0
    );
  }

  const increaseQuantity = async (item) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/cart/increase/${user.user._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: item.productId._id,
          }),
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setCart(updatedUser.user.cart);
      } else {
        const { error } = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const decreaseQuantity = async (item) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/cart/decrease/${user.user._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: item.productId._id,
          }),
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setCart(updatedUser.user.cart);
      } else {
        const { error } = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  async function createStripeCheckoutSession() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/order/createStripeCheckoutSession/${
          user.user._id
        }/${orderId}`, //adding order._id
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            checkoutProducts: cart.map((product) => ({
              id: product.productId?._id,
              quantity: product.quantity,
            })),
          }),
        }
      );

      const body = await response.json();
      if (body.url) {
        // await clearCart();
        window.location.replace(body.url);
      } else {
        console.error("Failed to create Stripe Checkout Session.");
      }
    } catch (error) {
      console.log("Error in checkout process.", error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryAddress((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function saveDeliveryAddress() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/order/address/${user.user._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/JSON",
          },
          body: JSON.stringify({ deliveryAddress }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setOrderId(data.orderId);
      } else {
        console.log("We couldn't save the deliveryAddress");
      }
    } catch (error) {
      console.log("Error in saving the delivery address.", error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const isEmpty = Object.values(deliveryAddress).some(
      (field) => field === ""
    );

    if (isEmpty) {
      showAlert("Please provide your delivery address to continue.", "info");
    } else {
      await saveDeliveryAddress();
      setDeliveryAddress({
        firstName: "",
        lastName: "",
        street: "",
        houseNum: "",
        zip: "",
        city: "",
        country: "",
      });
      showAlert("Delivery Address saved successfully.", "success");
      setIsModalOpen(false);
    }
  }

  return (
    <div className="cart-container">
      <div className="background"></div>
      <div className="cartHeader">
        <h1>{t("cart.header")}</h1>
      </div>
      {cart.length === 0 ? (
        <p>{t("cart.cartLength")}</p>
      ) : (
        <div className="itemsPaymentsContainer">
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
                    <p>
                      {t("cart.quantity")}: <span>{item.quantity}</span>
                    </p>
                    <p>
                      {t("cart.price")}: <span>{item.productPrice} €</span>
                    </p>
                  </div>
                  <div className="incDecDelete">
                    <div className="incDec">
                      <button
                        className="inc"
                        onClick={() => increaseQuantity(item)}
                      >
                        +
                      </button>
                      <p>{item.quantity}</p>
                      <button
                        className="dec"
                        onClick={() => decreaseQuantity(item)}
                      >
                        -
                      </button>
                    </div>
                    <div
                      className="delete-payment"
                      onClick={() => handleDelete(item)}
                    >
                      <MdOutlineDelete className="dlt" />
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="paymentContainer">
            <div className="shipment-subTotal-vat">
              <div className="subTotal">
                <p>{t("cart.subTotal")} :</p>{" "}
                <span>{total().toFixed(2)} €</span>
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
              {/* Button to open the modal */}
              <div className="deliveryAddressOpenModalButton">
                <button
                  className="openModalButton"
                  onClick={() => setIsModalOpen(true)}
                >
                  Enter Delivery Address
                </button>
              </div>

              {/* Modal for delivery address */}
              <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form className="deliveryAddress-form" onSubmit={handleSubmit}>
                  <h1>Delivery Address</h1>
                  <label>
                    First Name:
                    <input
                      type="text"
                      name="firstName"
                      value={deliveryAddress.firstName}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Last Name:
                    <input
                      type="text"
                      name="lastName"
                      value={deliveryAddress.lastName}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Street:
                    <input
                      type="text"
                      name="street"
                      value={deliveryAddress.street}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Num:
                    <input
                      type="text"
                      name="houseNum"
                      value={deliveryAddress.houseNum}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    ZIP:
                    <input
                      type="text"
                      name="zip"
                      value={deliveryAddress.zip}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    City:
                    <input
                      type="text"
                      name="city"
                      value={deliveryAddress.city}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Country:
                    <input
                      type="text"
                      name="country"
                      value={deliveryAddress.country}
                      onChange={handleChange}
                    />
                  </label>
                  <div className="deliveryAddressBtn">
                    <button type="submit">Save Address</button>
                  </div>
                </form>
              </Modal>

              <div className="paymentButtons">
                <button
                  className="checkOut"
                  onClick={createStripeCheckoutSession}
                >
                  {t("cart.checkout")}
                </button>
              </div>

              <div className="totalPayment">
                <h2>{t("cart.totalToPay")}:</h2>
                <p>{total().toFixed(2)}€</p>
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
        </div>
      )}
    </div>
  );
}

export default Cart;
