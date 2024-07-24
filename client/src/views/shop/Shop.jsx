import React, { useContext, useState, useEffect } from "react";
import "./Shop.css";
import { UserContext } from "../../context/userContext.jsx";
import SortFilter from "../../components/sort-filter/SortFilter.jsx";
import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";
import { GrNext } from "react-icons/gr";
import ProductDetails from "../../components/productDetails/ProductDetails.jsx";
import { useTranslation } from "react-i18next";

function Shop() {
  const { sortedProducts, list, setList, filter, addToWishList, addToCart } =
    useContext(UserContext);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [page, setPage] = useState(1);
  const [likedItems, setLikedItems /*  filter*/] = useState(
    new Array(sortedProducts.length).fill(false)
  );
  const { t } = useTranslation();
  const productLength = Math.ceil(sortedProducts.length / 10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    async function showAllProducts() {
      try {
        let response;
        if (!filter.category) {
          response = await fetch(
            `${import.meta.env.VITE_API}/product/show?page=${page}`
          );
        } else {
          setPage((prev) => (prev > productLength ? 1 : page));
          // setPage(page)
          response = await fetch(
            `${import.meta.env.VITE_API}/product/show/filtered?page=${page}&category=${filter.category}`
          );
        }

        if (response.ok) {
          const data = await response.json();
          setList(data);
        } else {
          const { error } = await response.json();
          throw new Error(error.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    showAllProducts();
  }, [page, filter.category, productLength]);

  function handleLike(index) {
    const newLikedItems = [...likedItems];
    newLikedItems[index] = !newLikedItems[index];
    setLikedItems(newLikedItems);
    const product = list[index];
    addToWishList(product);
  }

  function handleMouseEnter(index) {
    setHoveredIndex(index);
  }

  function handleMouseLeave() {
    setHoveredIndex(-1);
  }

  function handleBtnPrev() {
    setPage(page - 1);
    if (page <= 1) {
      setPage(1);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleBtnNext() {
    if (list.length < 10) {
      return;
    }
    setPage(page + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openModal(product) {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedProduct(null);
  }

  return (
    <div className="shopContainer">
      <div className="topBackgroundImage"></div>
      <div className="header">
        <h1>{t("shop.header2")}</h1>
      </div>
      <SortFilter />
      <div className="shopProducts">
        {!!list.length &&
          list.map((item, index) => (
            <div className="productsBox" key={item._id}>
              <div className="imageBox" onClick={() => openModal(item)}>
                <img src={item.image} alt="" width={100} height={100} />

                <div
                  className="likeButton"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(index);
                  }}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  {likedItems[index] ? (
                    <IoMdHeart style={{ color: "darkred" }} />
                  ) : hoveredIndex === index ? (
                    <IoMdHeart style={{ color: "white" }} />
                  ) : (
                    <CiHeart style={{ color: "white" }} />
                  )}
                </div>
              </div>
              <div className="info">
                <p>{item.name}</p>
                <p>{item.price}€</p>
                <button
                  className="addToCart"
                  onClick={() => addToCart(item, 1)}
                >
                  {t("shop.addToCart")}
                </button>
              </div>
            </div>
          ))}
      </div>
      <div className="pagebtn">
        <div className="next-prev">
          <div className="prevContainer">
            <GrNext onClick={handleBtnPrev} className="prev" />
            <p className="prevText">{t("shop.prevText")}</p>
          </div>
          <p>{page}</p>
          <div className="nextContainer">
            <p className="nextText">{t("shop.nextText")}</p>
            <GrNext onClick={handleBtnNext} className="next" />
          </div>
        </div>
        <label>
          {t("shop.page")}: {page} of {productLength}
        </label>
      </div>
      {isModalOpen && (
        <ProductDetails product={selectedProduct} onClose={closeModal} />
      )}
    </div>
  );
}

export default Shop;
