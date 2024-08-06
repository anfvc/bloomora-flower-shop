// SuccessPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDone } from "react-icons/md";
import "./SuccessPage.css";

const SuccessPage = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowSuccess(true);
    }, 1000);
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="successContainer">
      <div className="modal-backdrop">
        <div className="modal">
          <MdDone className="icon show" />
        </div>
        <p>Payment Successful!</p>
      </div>
    </div>
  );
};

export default SuccessPage;
