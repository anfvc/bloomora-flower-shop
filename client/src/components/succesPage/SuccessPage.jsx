// SuccessPage.jsx
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MdDone } from "react-icons/md";
import "./SuccessPage.css";

const SuccessPage = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, checkUserAuth, setOrders, orders } = useContext(UserContext);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    async function createOrder() {
      const checkoutProducts = JSON.parse(searchParams.get("checkoutProducts"));

      const response = await fetch(
        `${import.meta.env.VITE_API}/order/createOrder/${user.user._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ checkoutProducts }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setOrders([...orders, data.order]);
        console.log(user);
      }
      // await new Promise((resolve) => setTimeout(resolve, 5000));
    }

    if (user.user?._id) {
      createOrder();
    }

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

  console.log(user);

  return (
    <div className="successContainer">
      <div className="modal-backdrop">
        <div className="modal">
          <MdDone className="icon show" />
        </div>
        <p>Payment Successful!</p>
        <p>
          If you don't want to go to your orders, you will be shortly redirected
          to the homepage!
        </p>
        <button onClick={handleButtonClick}>Go to your Orders</button>
      </div>
    </div>
  );
};

export default SuccessPage;
