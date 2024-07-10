import React, { useContext, useState } from "react";
import "./SortFilter.css";
import { RiArrowDownWideLine } from "react-icons/ri";
import { UserContext } from "../../context/userContext";

function SortFilter() {
  const { sortAlphabeticallyAZ, sortAlphabeticallyZA, sortByPriceLowToHigh, sortByPriceHighToLow, resetSorting } = useContext(UserContext);
  const [isSortOpen, setIsSortOpen] = useState(false);

  function handleSortChange(sortOption) {
    switch(sortOption) {
      case 'az':
        sortAlphabeticallyAZ();
        break;
      case 'za':
        sortAlphabeticallyZA();
        break;
      case 'priceLowToHigh':
        sortByPriceLowToHigh();
        break;
      case 'priceHighToLow':
        sortByPriceHighToLow();
        break;
      default:
        resetSorting();
    }
    setIsSortOpen(false);
  }

  return (
    <div className="sort-filter">
      <div className="sortButton" onClick={() => setIsSortOpen(!isSortOpen)}>
        <p>sort</p>
        <RiArrowDownWideLine className="sortIcon" />
      </div>
      {isSortOpen && (
        <div className="sort">
          <ul>
            <li onClick={() => handleSortChange('az')}>alphabetically, a-z</li>
            <li onClick={() => handleSortChange('za')}>alphabetically, z-a</li>
            <li onClick={() => handleSortChange('priceHighToLow')}>price, high to low</li>
            <li onClick={() => handleSortChange('priceLowToHigh')}>price, low to high</li>
          </ul>
        </div>
      )}
      <div className="filter">
        <p>filter</p>
      </div>
    </div>
  );
}

export default SortFilter;
