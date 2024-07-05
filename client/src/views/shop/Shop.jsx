import React, { useContext } from "react";
import "./Shop.css";
import { UserContext } from "../../context/userContext.jsx";
import SortFilter from "../../components/sort-filter/SortFilter.jsx";
import { CiHeart } from "react-icons/ci";

function Shop() {
  const { sortedProducts } = useContext(UserContext);

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
              <div className="likeButton">
                <CiHeart />
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
