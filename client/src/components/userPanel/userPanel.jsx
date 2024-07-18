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
import Invoice from "../invoice/Invoice"; 

function UserPanel() {
  const { user } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState("welcome"); 
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
        <button className="sidebarButton" onClick={() => setActiveSection("orders")}>
          <p>My Orders</p>
          <FaClipboardList />
        </button>
        <button className="sidebarButton" onClick={() => setActiveSection("invoices")}> {/* Set active section to invoices */}
          <p>My Invoices</p>
          <FaFileInvoice />
        </button>
        <button className="sidebarButton" onClick={() => setActiveSection("wishlist")}>
          <p>Wishlist</p>
          <PiListHeartFill />
        </button>
        {user.role === "admin" && (
          <button className="sidebarButton" onClick={() => navigate("/admin")}>
            <p>Admin Panel</p>
            <GrDocumentConfig />
          </button>
        )}
      </div>

      <div className="userDetails">
        {isEditing ? (
          <EditProfile closeEdit={closeEdit} />
        ) : (
          <div className="sectionContent">
            {activeSection === "welcome" && (
              <div className="welcome">
                <h1>
                  Welcome, {user.user.firstName[0].toUpperCase() + user.user.firstName.slice(1)} {user.user.lastName[0].toUpperCase() + user.user.lastName.slice(1)}
                </h1>
                <Wishlist />
              </div>
            )}
            {activeSection === "orders" && <div>Orders Component</div>}
            {activeSection === "invoices" && <Invoice />} 
            {activeSection === "wishlist" && <Wishlist />} 
          </div>
        )}
      </div> 
    </div>
  );
}

export default UserPanel;
