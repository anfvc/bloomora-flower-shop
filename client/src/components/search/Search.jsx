import React, { useContext, useState } from "react";
import "./Search.css";
import { CiSearch } from "react-icons/ci";
import { UserContext } from "../../context/userContext.jsx";
import { useTranslation } from "react-i18next";

function Search() {
  const { searchProducts, filteredProducts, addToCart } = useContext(UserContext);
  const [query, setQuery] = useState("");
  const [isSearchBarEmpty, setIsSearchBarEmpty] = useState(true);
  const { t } = useTranslation();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    searchProducts(value);
    setIsSearchBarEmpty(value === "");
  };

  const hasNoResults = !isSearchBarEmpty && filteredProducts.length === 0;

  return (
    <div className="searchContainer">
      <div className="backgroundImage"></div>
      <div className="searchBox">
        <div className="header">
          <h1>{t("search.header")}</h1>
        </div>
        <div className="searchBar">
          <input
            type="text"
            placeholder={t("search.placeholder")}
            className="searchInput"
            value={query}
            onChange={handleInputChange}
          />
          <CiSearch className="searchIcon" />
        </div>
        <div className="searchResults">
          {isSearchBarEmpty ? (
            <p className="emptyMessage">{t("search.emptyMessage")}</p>
          ) : hasNoResults ? (
            <p className="emptyMessage">{t("search.emptyMessage")}</p>
          ) : (
            filteredProducts.map((product) => (
              <div className="productItem" key={product._id}>
                <div className="productItemImage">
                  <img
                    src={product.image}
                    alt={product.name}
                    width={50}
                    height={50}
                  />
                </div>
                <div>
                  <p>{product.name}</p>
                  <p>{product.price}€</p>
                </div>
                <button className="searchAddToCartBtn" onClick={()=> addToCart(product, 1)}>{t("search.addToCart")}</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
