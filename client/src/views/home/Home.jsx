import React from "react";
import "./Home.css";
import LandingSlider from "../../components/landingPageSlider/LandingSlider";
import WeddingSlider from "../../components/weddingSlider/WeddingSlider";

function Home() {

  return (
    <div className="homeContainer">
      <LandingSlider />
      <WeddingSlider />
    </div>
  );
}

export default Home;
