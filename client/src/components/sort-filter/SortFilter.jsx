import React, { useContext, useState } from "react";
import "./SortFilter.css";
import { RiArrowDownWideLine } from "react-icons/ri";
import { UserContext } from "../../context/userContext";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "react-i18next";

function SortFilter() {
  const {
    sortAlphabeticallyAZ,
    sortAlphabeticallyZA,
    sortByPriceLowToHigh,
    sortByPriceHighToLow,
    resetSorting,
    setIsMenuOpen,
    handleFilter,
    filter,
    setList,
  } = useContext(UserContext);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { t } = useTranslation();

  function handleSortChange(sortOption) {
    switch (sortOption) {
      case "az":
        sortAlphabeticallyAZ();
        break;
      case "za":
        sortAlphabeticallyZA();
        break;
      case "priceLowToHigh":
        sortByPriceLowToHigh();
        break;
      case "priceHighToLow":
        sortByPriceHighToLow();
        break;
      default:
        resetSorting();
    }
    setIsSortOpen(false);
  }

  function handleFilterButtonClick() {
    setIsFilterOpen(!isFilterOpen);
    setIsSortOpen(false); 
    setIsMenuOpen(false);
  }

  function handleSortButtonClick() {
    setIsSortOpen(!isSortOpen);
    setIsFilterOpen(false); 
  }

  const categories = [
    { value: "Decor", label: t("filter.category2") },
    { value: "Eustoma", label: t("filter.category3") },
    { value: "Flowers on Ocassion", label: t("filter.category4") },
    { value: "Gifts", label: t("filter.category5") },
    { value: "House Plants", label: t("filter.category6") },
    { value: "Peonies", label: t("filter.category7") },
    { value: "Roses", label: t("filter.category8") },
  ];

  return (
    <div className="sort-filter">
      <div className="sortButton" onClick={handleSortButtonClick}>
        <p>{t("sort.header")}</p>
        <RiArrowDownWideLine className="sortIcon" />
      </div>
      {/* {isSortOpen && (
        <div className="sort">
          <ul>
            <li onClick={() => handleSortChange("az")}>{t("sort.az")}</li>
            <li onClick={() => handleSortChange("za")}>{t("sort.za")}</li>
            <li onClick={() => handleSortChange("priceLowToHigh")}>
              {t("sort.priceLowToHigh")}
            </li>
            <li onClick={() => handleSortChange("priceHighToLow")}>
              {t("sort.priceHighToLow")}
            </li>
          </ul>
        </div>
      )} */}
      <div className="filter" onClick={handleFilterButtonClick}>
        <p>{t("filter.header")}</p>
      </div>
      {isFilterOpen && (
        <div className="filter-panel">
          <div className="filter-header">
            <IoClose
              className="close-icon"
              onClick={() => setIsFilterOpen(false)}
            />
          </div>
          <div className="filter-body">
            {categories.map((category) => (
              <div
                key={category.value}
                className={`filter-item ${
                  filter.category === category.value ? "active" : ""
                }`}
                onClick={() =>
                  handleFilter({
                    target: { name: "category", value: category.value },
                  })
                }
              >
                {category.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SortFilter;
