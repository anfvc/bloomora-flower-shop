import { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { FaUser } from "react-icons/fa6";
import "./userPanel.css";
import EditProfile from "../editProfile/editProfile";
import { FaUserEdit } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa6";
import { FaFileInvoice } from "react-icons/fa";
import { PiListHeartFill } from "react-icons/pi";
import { GrDocumentConfig } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import Wishlist from "../wishlist/wishlist";


function UserPanel() {
  const { user } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();


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
          <p>Edit Profile</p>
          <FaUserEdit />
        </button>
        <button className="sidebarButton">
          <p>My Orders</p>
          <FaClipboardList />
        </button>
        <button className="sidebarButton">
          <p>My Invoices</p>
          <FaFileInvoice />
        </button>
        <button className="sidebarButton">
          <p>Wishlist</p>
          <PiListHeartFill />
        </button>
      </div>
      {user.role === "admin" && ( //This button needs styling. Created admin panel for navigating to admin panel for admins only
        <button className="sidebarButton" onClick={() => navigate("/admin")}>
          <p>Admin Panel</p>
          <GrDocumentConfig />
        </button>
      )}

      <div className="userDetails">
        {isEditing ? (
          <EditProfile closeEdit={closeEdit} />
        ) : (
          <div className="welcome">
            <h1>
              Welcome, {user.user.firstName[0].toUpperCase() + user.user.firstName.slice(1)} {user.user.lastName[0].toUpperCase() + user.user.lastName.slice(1)}
            </h1>
            
            <Wishlist/>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserPanel;
