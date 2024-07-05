import React, { useContext, useState } from "react";
import "./Shop.css";
import { UserContext } from "../../context/userContext.jsx";
import SortFilter from "../../components/sort-filter/SortFilter.jsx";
import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";

function Shop() {
  const { sortedProducts } = useContext(UserContext);
  const [likedItems, setLikedItems] = useState(
    new Array(sortedProducts.length).fill(false)
  );
  const [hoveredIndex, setHoveredIndex] = useState(-1);

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

  return (
    <div className="shopContainer">
      <div className="topBackgroundImage"></div>
      <SortFilter />
      <div className="shopProducts">
        {sortedProducts.map((item, index) => (
          <div className="productsBox" key={index}>
            <div className="imageBox">
              <img src={item.image} alt={item.name} />
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
    </div>
  );
}

export default Shop;
