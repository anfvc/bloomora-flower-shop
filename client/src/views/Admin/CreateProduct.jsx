import { useState, useRef } from "react";
import "./CreateProduct.css";
import {
  FaClipboardList,
  FaFileInvoice,
  FaUser,
  FaUserEdit,
} from "react-icons/fa";
import { PiListHeartFill } from "react-icons/pi";
import { useAlert } from "../../context/alertContext";
import { useTranslation } from "react-i18next";

function CreateProduct() {
  const { t } = useTranslation();
  const [data, setData] = useState({
    price: 0,
    name: "",
    category: "",
    subcategory: "",
    description: "",
  });
  const { showAlert } = useAlert();

  const imageInput = useRef(null);

  const [image, setImage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("subcategory", data.subcategory);
    formData.append("description", data.description);
    formData.append("image", image);

    try {
      const settings = {
        method: "POST",
        body: formData,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API}/product/create`,
        settings
      );

      if (response.ok) {
        const newData = await response.json();
        console.log(newData);
        showAlert(newData.msg, "success");
        setData({
          price: 0,
          name: "",
          category: "",
          subcategory: "",
          description: "",
        });
      } else {
        const { error } = await response.json();
        throw new Error(error.msg);
      }
    } catch (error) {
      alert(error.msg);
    }
    setImage("");
    imageInput.current.value = "";
  }

  return (
    <div className="adminContainer">
      {/* <div className="sidebarAdmin">
        <FaUser className="userImageAdmin" />
        <button className="sidebarButtonAdmin">
          <p>Edit Profile</p>
          <FaUserEdit />
        </button>
        <button className="sidebarButtonAdmin">
          <p>My Orders</p>
          <FaClipboardList />
        </button>
        <button className="sidebarButtonAdmin">
          <p>My Invoices</p>
          <FaFileInvoice />
        </button>
        <button className="sidebarButtonAdmin">
          <p>Wishlist</p>
          <PiListHeartFill />
        </button>
      </div> */}
      <form onSubmit={handleSubmit}>
        <div className="formBox">
          <div className="adminHeader">
            <h1>{t("userPanel.adminPanel.header")}</h1>
          </div>
          <div className="selectImages">
            <p>{t("userPanel.adminPanel.selectImage")}</p>
            <img src={image && URL.createObjectURL(image)} alt="" width={100} />
            <label className="custom-file-upload">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                ref={imageInput}
              />
              {t("userPanel.adminPanel.selectFile")}
            </label>
          </div>
          <div className="inputs">
            <input
              type="text"
              placeholder={t("userPanel.adminPanel.nameOfProduct")}
              name="name"
              value={data.name}
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder={t("userPanel.adminPanel.nameOfPrice")}
              name="price"
              value={data.price}
              onChange={handleChange}
            />
          </div>
          <div className="description">
            <p>{t("userPanel.adminPanel.description")}</p>
            <textarea
              name="description"
              placeholder={t("userPanel.adminPanel.description1")}
              value={data.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="category-subcategory">
            <div className="category">
              <p>{t("userPanel.adminPanel.category")}</p>
              <select
                name="category"
                value={data.category}
                onChange={handleChange}
              >
                <option value="" disabled>
                {t("userPanel.adminPanel.selectYourOption")}
                </option>
                <option value="Decor">Decor</option>
                <option value="Eustoma">Eustoma</option>
                <option value="Flowers on Ocassion">Flowers on Ocassion</option>
                <option value="Gifts">Gifts</option>
                <option value="House Plants">House Plants</option>
                <option value="Peonies">Peonies</option>
                <option value="Roses">Roses</option>
              </select>
            </div>
            <div className="subcategory">
              <p>{t("userPanel.adminPanel.subCategory")}</p>
              <select
                name="subcategory"
                value={data.subcategory}
                onChange={handleChange}
              >
                <option value="" disabled>
                {t("userPanel.adminPanel.selectYourOption")}
                </option>
                <option value="Artificial">{t("userPanel.adminPanel.artificial")}</option>
                <option value="Christmas">{t("userPanel.adminPanel.christmas")}</option>
                <option value="For Home">{t("userPanel.adminPanel.forHome")}</option>
                <option value="St. Valentine's Day">{t("userPanel.adminPanel.stValentineDay")}</option>
                <option value="Wedding Anniversary">{t("userPanel.adminPanel.weddingAnniversary")}</option>
                <option value="Birthday">{t("userPanel.adminPanel.birthday")}</option>
              </select>
            </div>
          </div>
          <button className="createProductButton">{t("userPanel.adminPanel.createProduct")}</button>
        </div>
      </form>
    </div>
  );
}

export default CreateProduct;
