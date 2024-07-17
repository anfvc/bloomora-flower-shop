import React from "react";
import "./WeddingEvents.css";
import image1 from "../../images/wedding/weddingEvents/image2.jpg";
import image2 from "../../images/wedding/weddingEvents/image3.jpg";
import image3 from "../../images/wedding/weddingEvents/image4.jpg";
import past1 from "../../images/wedding/weddingEvents/past1.jpg";
import past2 from "../../images/wedding/weddingEvents/past2.jpg";
import past3 from "../../images/wedding/weddingEvents/past3.jpg";
import past4 from "../../images/wedding/weddingEvents/past4.jpg";
import past5 from "../../images/wedding/weddingEvents/past5.jpg";
import past6 from "../../images/wedding/weddingEvents/past6.jpg";
import past7 from "../../images/wedding/weddingEvents/past7.jpg";
import past8 from "../../images/wedding/weddingEvents/past8.jpg";
import past9 from "../../images/wedding/weddingEvents/past9.jpg";

function WeddingEvents() {
  return (
    <div className="weddingEventsContainer">
      <div className="backGroundImage"></div>
      <div className="header">
        <h1>events</h1>
      </div>

      <div className="eventBoxContainer">
        <div className="box1">
          <div className="infoBox">
            <h2>flowers that work for you</h2>
            <p>
              Using our <span>19 YEARS OF EXPERIENCE</span> in service and
              hospitality industries, venue coordination, wedding planning, and
              floral design, we create innovative, whimsical, and elegant
              designs to make your vision come to life.
            </p>
          </div>
          <div className="imageBox1">
            <img src={image1} alt="" />
          </div>
        </div>

        <div className="box2">
          <div className="imageBox2">
            <img src={image2} alt="" />
          </div>
          <div className="infoBox2">
            <h2>what we offer</h2>
            <div className="offers">
              <ul>
                <li>Cocktail Arrangements</li>
                <li>Centerpieces</li>
                <li>Statement Pieces</li>
                <li>Floral Installations</li>
                <li>Plant Installations</li>
              </ul>
              <ul>
                <li>Corporate Events</li>
                <li>Dinner Parties</li>
                <li>Showers</li>
                <li>Rehearsals</li>
                <li>Staging</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="box3">
          <div className="infoBox3">
            <h2>flowers that work for you</h2>
            <p>
              Using our <span>19 YEARS OF EXPERIENCE</span> in service and
              hospitality industries, venue coordination, wedding planning, and
              floral design, we create innovative, whimsical, and elegant
              designs to make your vision come to life.
            </p>
            <div className="orderButtonBox">
              <button>inquire about event</button>
            </div>
          </div>
          <div className="imageBox3">
            <img src={image3} alt="" />
          </div>
        </div>

        <div className="pastEventsContainer">
          <div className="past-header">
            <h2>past events</h2>
          </div>

          <div className="pastEventBoxContainer">
            <div className="pastEventBox1">
              <img src={past1} alt="" />
              <img src={past2} alt="" />
              <img src={past3} alt="" />
            </div>

            <div className="pastEventBox2">
              <img src={past4} alt="" />
              <img src={past5} alt="" />
              <img src={past6} alt="" />
            </div>

            <div className="pastEventBox3">
              <img src={past7} alt="" />
              <img src={past8} alt="" />
              <img src={past9} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeddingEvents;
