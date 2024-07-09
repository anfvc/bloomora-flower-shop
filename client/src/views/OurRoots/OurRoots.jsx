import React, { useEffect } from "react";
import "./OurRoots.css";
import image4 from "../../images/ourRootsImage/image4.jpg";
import image5 from "../../images/ourRootsImage/image5.jpg";

function OurRoots() {
  useEffect(() => {
    const handleScroll = () => {
      const image1Element = document.querySelector(".image1");
      const image2Element = document.querySelector(".image2");
      const scrollPosition = window.scrollY;

      if (scrollPosition > 100) {
        image1Element.classList.add("visible1");
        image2Element.classList.add("visible2");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="ourRootsContainer">
      <div className="backgroundImage"></div>
      <div className="header">
        <h1>our roots</h1>
      </div>
      <div className="roots">
        <div className="index">
          <p>
            Melissa Feveyear is the visionary behind Terra Bella Flowers. She
            combined her formal floral design training (San Francisco and UK)
            with her education in Environmental Studies/Hazardous Waste
            Management to create a sustainable flower shop in what has
            historically been a toxic industry. Sourcing her flowers from
            farmers markets and local growers, she realized that this business
            model needed to be expanded to her fellow florists. In 2011 she
            collaborated with several local flower farmers to create the Seattle
            Wholesale Growers Market Cooperative, non-profit market place for NW
            florists to source local and US grown flowers. Learn more about SWGM
            here.
            <p>
              <a href="http://seattlewholesalegrowersmarket.com/">
                http://seattlewholesalegrowersmarket.com/
              </a>{" "}
              Melissa and her work in the sustainable flower movement has been
              published in national and international publications, printed in
              The 50 Mile Bouquet by Debra Prinzing and interviewed on NPR.
            </p>
            <p>
              To Learn more about the sustainable floral movement please visit
              <a href="https://slowflowers.com/"> https://slowflowers.com/</a>
            </p>
          </p>
        </div>
        <div className="rootImages">
          <img src={image4} alt="" className="image1" />
          <img src={image5} alt="" className="image2" />
        </div>
      </div>
    </div>
  );
}

export default OurRoots;
