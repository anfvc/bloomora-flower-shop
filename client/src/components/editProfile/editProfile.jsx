import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import "./editProfile.css";
import { useAlert } from "../../context/alertContext";
import { useTranslation } from "react-i18next";


function EditProfile() {

  const { user, setUser, checkUserAuth } = useContext(UserContext);
  const { showAlert } = useAlert();
  const { t } = useTranslation();
 
  const [userAddress, setUserAddress] = useState({
    street: user.user.address?.street,
    houseNum: user.user.address?.houseNum,
    zip: user.user.address?.zip,
    city: user.user.address?.city,
    country: user.user.address?.country,
  });
  const [formData, setFormData] = useState({
    firstName: user.user.firstName,
    lastName: user.user.lastName,
    address: userAddress,
  });

  useEffect(() => {
    setFormData({ ...formData, address: userAddress });
  }, [userAddress]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    try {
      const settings = {
        method: "PATCH",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/JSON",
        },
      };

      const response = await fetch(
        `${import.meta.env.VITE_API}/user/update/${user.user._id}`,
        settings
      );

      if (response.ok) {
        const updateUser = await response.json();
        console.log("updateUser", updateUser.updatedUser);

        setUser({
          ...user,
          firstName: updateUser.updatedUser.firstName,
          lastName: updateUser.updatedUser.lastName,
          address: {
            street: updateUser.updatedUser.street,
            num: updateUser.updatedUser.num,
            zip: updateUser.updatedUser.zip,
            city: updateUser.updatedUser.city,
            country: updateUser.updatedUser.country,
          },
        });

        checkUserAuth();
        showAlert("Your profile has been successfully edited");
        setFormData(user);
      } else {
        const { error } = await response.json();
        throw new Error(error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form className="editProfileForm" onSubmit={handleSaveProfile}>
      <h1>{t("userPanel.edit.header")}</h1>
      <label>
        {t("userPanel.edit.firstName")}
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </label>
      <label>
        {t("userPanel.edit.lastName")}
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </label>
      <label>{t("userPanel.edit.invoiceAddress")}</label>
      <label>
        {t("userPanel.edit.street")}
        <input
          type="text"
          name="street"
          value={userAddress.street}
          onChange={(e) => {
            setUserAddress({ ...userAddress, street: e.target.value });
          }}
        />
      </label>
      <label>
        {t("userPanel.edit.num")}
        <input
          type="text"
          name="houseNum"
          value={userAddress.houseNum}
          onChange={(e) => {
            setUserAddress({ ...userAddress, houseNum: e.target.value });
          }}
        />
      </label>
      <label>
        {t("userPanel.edit.zip")}
        <input
          type="text"
          name="zip"
          value={userAddress.zip}
          onChange={(e) => {
            setUserAddress({ ...userAddress, zip: e.target.value });
          }}
        />
      </label>
      <label>
        {t("userPanel.edit.city")}
        <input
          type="text"
          name="city"
          value={userAddress.city}
          onChange={(e) => {
            setUserAddress({ ...userAddress, city: e.target.value });
          }}
        />
      </label>
      <label>
        {t("userPanel.edit.country")}
        <input
          type="text"
          name="country"
          value={userAddress.country}
          onChange={(e) => {
            setUserAddress({ ...userAddress, country: e.target.value });
          }}
        />
      </label>

      <div className="save-cancel">
        <button type="submit" className="saveButton">
          {t("userPanel.edit.save")}
        </button>


        {/* <button type="button" className="cancelButton" onClick={handleChange}>

          Cancel
        </button> */}
      </div>
    </form>
  );
}

export default EditProfile;
