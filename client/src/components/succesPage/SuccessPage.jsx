// SuccessPage.jsx
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BsArrowRightShort } from "react-icons/bs";
import { MdDone } from "react-icons/md";
import "./SuccessPage.css";

const SuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, setOrders, orders, deliveryAddress, setDeliveryAddress } =
    useContext(UserContext);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    async function clearCart() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API}/cart/clear/${user.user._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/JSON",
            },
          }
        );

        if (response.ok) {
          setCart([]);
        } else {
          const { error } = await response.json();
          throw new Error(error.message);
        }
      } catch (error) {
        console.log("Error clearing cart.");
      }
    }

    clearCart();

    const timer = setTimeout(() => {
      if (!isClicked) {
        navigate("/");
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [user.user?._id, isClicked, navigate]);

  function handleButtonClick() {
    setIsClicked(true);
    navigate("/userPanel?section=orders");
  }

  function handleButtonClick() {
    setIsClicked(true);
    navigate("/userPanel?section=orders");
  }

  // console.log(user);
  // console.log(orders);

  return (
    <div className="successContainer">
      <div className="modal-backdrop">
        <div className="modal">
          <MdDone className="icon show" />
        </div>
        <p>Payment Successful!</p>
        <div className="goToOrders">
          <BsArrowRightShort className="goToOrdersIcon" />
          <button onClick={handleButtonClick}>Go to your Orders</button>
        </div>
        <span>or</span>
        <p>You will be automatically redirected to the home page</p>
      </div>
    </div>
  );
};

export default SuccessPage;
