import React, { useContext, useState, useEffect } from "react";
import "./Shop.css";
import { UserContext } from "../../context/userContext.jsx";
import SortFilter from "../../components/sort-filter/SortFilter.jsx";
import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";

function Shop() {
  const { sortedProducts, list, setList } = useContext(UserContext);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  // const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  // const [allProd, setAllProd] = useState([])
  // const [totalPages, setTotalPages] = useState(0)
  // const [likedItems, setLikedItems] = useState(
  //   new Array(/* sortedProducts */list.length).fill(false)
  // );
  const [likedItems, setLikedItems] = useState(
    new Array(sortedProducts.length).fill(false)
  );

  useEffect(() => {
    async function showAllProducts() {
      try {
        const response = await fetch(
          `http://localhost:5100/api/product/show?page=${page}`
        );

        if (response.ok) {
          const data = await response.json();

          setList(data);
          console.log(data);
        } else {
          const { error } = await response.json();
          throw new Error(error.message);
        }
      } catch (error) {
        alert(error.message);
      }
    }
    showAllProducts();
  }, [page]);

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
  }

  function handleBtnNext() {
    if (list.length < 10) {
      return;
    }
    setPage(page + 1);
  }

  const productLength = (sortedProducts.length / 10).toFixed(0);

  return (
    <div className="shopContainer">
      <div className="topBackgroundImage"></div>
      <div className="header">
        <h1>shop flowers & gifts</h1>
      </div>
      <SortFilter />
      <div className="shopProducts">
        {list.map((item, index) => (
          <div className="productsBox" key={item._id}>
            <div className="imageBox">
              <img src={item.image} alt="" width={100} height={100} />
              <button className="addToCart">add to cart</button>
              <div
                className="likeButton"
                onClick={() => handleLike(index)}
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
              <p>~ {item.name} ~</p>
              <p>{item.price}€</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pagebtn">
        <label>
          current page: {page} of {productLength}
          <input
            type="button"
            value="to the previous page"
            onClick={handleBtnPrev}
          />
          <input
            type="button"
            value="to the next page"
            onClick={handleBtnNext}
          />
        </label>
      </div>
    </div>
  );
}

export default Shop;
