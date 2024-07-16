import React, { useContext, useState, useEffect } from "react";
import "./Shop.css";
import { UserContext } from "../../context/userContext.jsx";
import SortFilter from "../../components/sort-filter/SortFilter.jsx";
import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";
import { GrNext } from "react-icons/gr";
import ProductDetails from "../../components/productDetails/ProductDetails.jsx";

function Shop() {
  const { sortedProducts, list, setList, filter } = useContext(UserContext);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [page, setPage] = useState(1);

  // const [allProd, setAllProd] = useState([])
  // const [totalPages, setTotalPages] = useState(0)
  // const [likedItems, setLikedItems] = useState(
  //   new Array(/* sortedProducts */list.length).fill(false)
  // );
  const [likedItems, setLikedItems] = useState(
    new Array(sortedProducts.length).fill(false)
  );

  const [newList, setNewList] = useState([]);
  const productLength = Math.ceil(sortedProducts.length / 10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    async function showAllProducts() {
      try {
        let response;
        if (!filter.category) {
          response = await fetch(
            `http://localhost:5100/api/product/show?page=${page}`
          );
        } else {
          setPage((prev) => (prev > productLength ? 1 : page));
          response = await fetch(
            `http://localhost:5100/api/product/show/filtered?page=${page}&category=${filter.category}`
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleBtnNext() {
    if (list.length < 10) {
      return;
    }
    setPage(page + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <h1>shop flowers & gifts</h1>
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
                <button className="addToCart">add to cart</button>
              </div>
            </div>
          ))}
      </div>
      <div className="pagebtn">
        <div className="next-prev">
          <div className="prevContainer">
            <GrNext onClick={handleBtnPrev} className="prev" />
            <p className="prevText">Back</p>
          </div>
          <p>{page}</p>
          <div className="nextContainer">
            <p className="nextText">Next</p>
            <GrNext onClick={handleBtnNext} className="next" />
          </div>
        </div>
        <label>
          Page: {page} of {productLength}
        </label>
      </div>
      {isModalOpen && (
        <ProductDetails product={selectedProduct} onClose={closeModal} />
      )}
    </div>
  );
}

export default Shop;
