import React, { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { FaUser } from "react-icons/fa6";
import "./userPanel.css";
import EditProfile from "../editProfile/editProfile";

function UserPanel() {
  const { user } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const closeEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="userPanelContainer">
      <div className="sidebar">
        <FaUser className="userImage" />
        <button className="sidebarButton" onClick={handleEditProfile}>
          Edit Profile
        </button>
        <button className="sidebarButton">My Orders</button>
        <button className="sidebarButton">My Invoices</button>
        <button className="sidebarButton">Wishlist</button>
      </div>
      <div className="userDetails">
        {isEditing ? (
          <EditProfile closeEdit={closeEdit} />
        ) : (
          <div className="welcome">
            <h1>
              Welcome, {user.firstName} {user.lastName}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserPanel;
