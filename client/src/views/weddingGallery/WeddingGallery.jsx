import React from "react";
import "./WeddingGallery.css";
import WeddingGalleryImages from "../../components/weddingGalleryImages/WeddingGalleryImages.jsx";

function WeddingGallery() {
  return (
    <div className="weddingGalleryContainer">
      <div className="header">
        <h1>wedding gallery</h1>
      </div>
      <WeddingGalleryImages />
    </div>
  );
}

export default WeddingGallery;
