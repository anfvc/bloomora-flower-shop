import React from "react";
import "./Home.css";
import LandingSlider from "../../components/landingPageSlider/LandingSlider";
import WeddingSlider from "../../components/weddingSlider/WeddingSlider";
import MostPopularProducts from "../../components/MostPopularProducts/MostPopularProducts";
import Support from "../../components/support/support";

function Home() {
  return (
    <div className="homeContainer">
      <LandingSlider />
      <WeddingSlider />
      <Support />
      <MostPopularProducts />
    </div>
  );
}

export default Home;
