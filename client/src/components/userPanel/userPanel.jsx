import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { FaUser } from "react-icons/fa6";
import "./userPanel.css";
import EditProfile from "../editProfile/editProfile";
import { FaUserEdit } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa6";
import { FaFileInvoice } from "react-icons/fa";
import { PiListHeartFill } from "react-icons/pi";
import { GrDocumentConfig } from "react-icons/gr";
import { TiUserDelete } from "react-icons/ti";
import { useNavigate, useLocation } from "react-router-dom";
import Wishlist from "../wishlist/wishlist";
import Invoice from "../invoice/Invoice";
import CreateProduct from "../../views/Admin/CreateProduct";
import MyOrders from "../MyOrder/MyOrders";
import { useTranslation } from "react-i18next";

function UserPanel() {
  const { user, setIsLoggedIn } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState("welcome");
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const section = queryParams.get("section");

    if (section) {
      setActiveSection(section);
    }
  }, [location]);

  const handleEditProfile = () => {
    setIsEditing(true);
    navigate("/userPanel?section=editProfile");
  };

  const closeEdit = () => {
    setIsEditing(false);
    navigate("/userPanel");
  };

  async function handleDeleteUser() {
    if (confirm("Are you sure you want to delete your account?"))
      try {
        const settings = {
          method: "DELETE",
        };

        const response = await fetch(
          `${import.meta.env.VITE_API}/user/delete/${user.user._id}`,
          settings
        );
        if (response.ok) {
          const { msg } = await response.json();
          alert(msg);
          setIsLoggedIn(false);
          navigate("/");
        }
      } catch (error) {
        alert(error.message);
      }
  }

  // console.log(user.user);
  if (user.user) {
    return (
      <div className="userPanelContainer">
        <div className="userPanelBackground"></div>
        <div className="userPanelHeader">
          <h1>user panel</h1>
        </div>
        <div className="sidebar">
          <FaUser className="userImage" />
          <button className="sidebarButton" onClick={handleEditProfile}>
            <p>{t("userPanel.edit")}</p>
            <FaUserEdit />
          </button>
          <button
            className="sidebarButton"
            onClick={() => {
              setIsEditing(false);
              navigate("/userPanel?section=orders");
            }}
          >
            <p>{t("userPanel.myOrders")}</p>
            <FaClipboardList />
          </button>
          <button
            className="sidebarButton"
            onClick={() => {
              setIsEditing(false);
              navigate("/userPanel?section=invoices");
            }}
          >
            <p>{t("userPanel.myInvoice")}</p>
            <FaFileInvoice />
          </button>
          <button
            className="sidebarButton"
            onClick={() => {
              setIsEditing(false);
              navigate("/userPanel?section=wishlist");
            }}
          >
            <p>{t("userPanel.wishList")}</p>
            <PiListHeartFill />
          </button>
          <button className="sidebarButton" onClick={handleDeleteUser}>
            <p>{t("delete_user")}</p>
            <TiUserDelete />
          </button>

          {/* <button className="sidebarButton" onClick={() => navigate("/wishlist")}>
            <p>Wishlist</p>
            <PiListHeartFill />
          </button> */}
          {user.user.role === "admin" && (
            <button
              className="sidebarButton"
              onClick={() => navigate("/userPanel?section=admin")}
            >
              <p>{t("userPanel.adminPanel")}</p>
              <GrDocumentConfig />
            </button>
          )}
        </div>

        <div className="userDetails">
          {isEditing ? (
            <EditProfile closeEdit={closeEdit} />
          ) : (
            <>
              <div className="sectionContent">
                {activeSection === "welcome" && (
                  <div className="welcome">
                    <h1>
                      {t("userPanel.welcome")},{" "}
                      {user.user.firstName[0].toUpperCase() +
                        user.user.firstName.slice(1)}{" "}
                      {user.user.lastName &&
                        user.user.lastName[0].toUpperCase() +
                          user.user.lastName.slice(1)}
                    </h1>
                  </div>
                )}
                {activeSection === "orders" && <MyOrders />}
                {activeSection === "invoices" && <Invoice />}
                {activeSection === "wishlist" && <Wishlist />}
                {activeSection === "admin" && <CreateProduct />}{" "}
                {/* Admin panel için CreateProduct bileşeni */}
              </div>
            </>
          )}
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default UserPanel;
