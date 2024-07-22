import { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./editProfile.css";

function EditProfile({ closeEdit }) {
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    street: "",
    num: "",
    zip: "",
    city: "",
    country: ""
    /* deliveryAddress: user.deliveryAddress || "", */
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

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

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const settings = {
        method: "PATCH",
        body: JSON.stringify({ formData }),
        headers: {
          "Content-Type": "application/JSON"
        },
      }
      const response = await fetch(`http://localhost:5100/api/user/update/${user.user._id}`, settings)

      if (response.ok) {
        const updateUser = await response.json()
        console.log(updateUser);

        setUser({
          ...user,
          firstName: formData.firstName,
          lastName: formData.lastName,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          street: formData.street,
          num: formData.num,
          zip: formData.zip,
          city: formData.city,
          country: formData.country
        });
        alert("Your profile has been successfully edited")
        closeEdit();
        setFormData({
          firstName: "",
          lastName: "",
          password: "",
          confirmPassword: "",
          street: "",
          houseNum: "",
          zip: "",
          city: "",
          country: ""
          /* deliveryAddress: user.deliveryAddress || "", */
        })
      } else {
        const { error } = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCancel = () => {
    closeEdit();
    navigate('/userPanel'); // UserPanel ana ekranına yönlendir
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
      </label>
      <label>
        Street:
        <input
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
        />
      </label>
      <label>
        Num:
        <input
          type="text"
          name="houseNum"
          value={formData.houseNum}
          onChange={handleChange}
        />
      </label>
      <label>
        ZIP:
        <input
          type="text"
          name="zip"
          value={formData.zip}
          onChange={handleChange}
        />
      </label>
      <label>
        City:
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
      </label>
      <label>
        Country:
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
      </label>
     
      <div className="save-cancel">
        <button type="submit" className="saveButton">
          Save
        </button>
        <button type="button" className="cancelButton" onClick={handleCancel} >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditProfile;
