import React, { useContext, useState, useEffect } from "react";
import "./Search.css";
import { CiSearch } from "react-icons/ci";
import { UserContext } from "../../context/userContext.jsx";

function Search() {
  const { searchProducts, filteredProducts } = useContext(UserContext);
  const [query, setQuery] = useState("");
  const [isSearchBarEmpty, setIsSearchBarEmpty] = useState(true);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    searchProducts(value);
    setIsSearchBarEmpty(value === ""); // Arama çubuğunun boş olup olmadığını kontrol etme
  };

  return (
    <div className="searchContainer">
      <div className="backgroundImage"></div>
      <div className="searchBox">
        <div className="header">
          <h1>I’m so excited to help you find it!</h1>
        </div>
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search"
            className="searchInput"
            value={query}
            onChange={handleInputChange} 
          />
          <CiSearch className="searchIcon" />
        </div>
        <div className="searchResults">
          {isSearchBarEmpty ? (
            <p className="emptyMessage">Your card is empty</p>
          ) : (
            filteredProducts.map((product) => (
              <div className="productItem" key={product._id}>
                <img src={product.image} alt={product.name} width={50} height={50} />
                <div>
                  <p>{product.name}</p>
                  <p>{product.price}€</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
