import React, { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; 
import "./editProfile.css";

function EditProfile({ closeEdit }) {
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    password: "",
    confirmPassword: "",
    invoiceAddress: user.invoiceAddress || "",
    deliveryAddress: user.deliveryAddress || "",
  });
  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setUser({
      ...user,
      firstName: formData.firstName,
      lastName: formData.lastName,
      invoiceAddress: formData.invoiceAddress,
      deliveryAddress: formData.deliveryAddress,
    });
    closeEdit();
  };

  return (
    <form className="editProfileForm" onSubmit={handleSaveProfile}>
      <h1>Edit Profile</h1>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </label>
      <label>
        Password:
        <input
          type={showPassword ? "text" : "password"} 
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="New Password"
        />
        <span onClick={togglePasswordVisibility} className="passwordIcon">
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </span>
      </label>
      <label>
        Confirm Password:
        <input
          type={showConfirmPassword ? "text" : "password"} 
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm New Password"
        />
        <span
          onClick={toggleConfirmPasswordVisibility}
          className="passwordIcon"
        >
          {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </span>
      </label>
      <label>
        Invoice Address:
        <input
          type="text"
          name="invoiceAddress"
          value={formData.invoiceAddress}
          onChange={handleChange}
        />
      </label>
      <label>
        Delivery Address:
        <input
          type="text"
          name="deliveryAddress"
          value={formData.deliveryAddress}
          onChange={handleChange}
        />
      </label>
      <div className="save-cancel">
        <button type="submit" className="saveButton">
          Save
        </button>
        <button type="button" className="cancelButton" onClick={closeEdit}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditProfile;
