import React from "react";
import "./WeddingProcess.css";
import image2 from "../../images/wedding/weddingProcess/image2.jpg";
import { NavLink } from "react-router-dom";

function WeddingProcess() {

  return (
    <div className="weddingProcessContainer">
      <div className="backgroundImage"></div>
      <div className="header">
        <h1>the wedding process</h1>
      </div>

      <div className="we-boxContainer">
        <div className="we-box">
          <img src={image2} alt="image2" className="image-we" />
          <div className="step">
            <h1>
              step <span>1</span>
            </h1>
            <p>
              Complete the form, think about how you want your day to unfold,
              and use as many visual terms as you can think of. We’ll look over
              your intake form and be in touch to schedule a consultation. For a
              full service 100+ guest count wedding, our minimum is $4800 in
              order to ensure a unique, lovely, and elegant event. A-la-carte
              services are offered for clients who are having a smaller, more
              intimate affair and who do not need as many components as our
              full-service clients; pricing varies.
            </p>
            <div className="bttns">
              <button>wedding inquiry</button>
              <button>a la carte inquiry</button>
            </div>
          </div>
        </div>

        <div className="we-box">
          <div className="step">
            <h1>
              step <span>2</span>
            </h1>
            <p>
              Next we’ll meet at our studio and talk all about your vision:
              colors, decor, styles, blooms! We’ll get to know each other and
              look at inspiration. See some of our recent work in our gallery
              below to get inspired for your big day.
            </p>
            <div className="bttns">
              <button><NavLink to="/wedding-gallery">wedding gallery</NavLink></button>
            </div>
          </div>
          <img src={image2} alt="image2" />
        </div>

        <div className="we-box">
          <img src={image2} alt="image2" />
          <div className="step">
            <h1>
              step <span>3</span>
            </h1>
            <p>
              From there we'll begin the contract process by sending you a
              curated proposal complete with itemized line items and mood board
              for your review.
            </p>
          </div>
        </div>

        <div className="we-box">
          <div className="step">
            <h1>
              step <span>4</span>
            </h1>
            <p>
              After a few edits, you’ll sign our contract and pay a retainer
              electronically. Over the following months, we’ll finalize any
              details and tie up loose ends by emails and meetings. Day-of, we
              will deliver, install, and clean-up so you can focus on time spent
              with your guests: eating, drinking, laughing, and dancing!
            </p>
          </div>
          <img src={image2} alt="image2" />
        </div>
      </div>
    </div>
  );
}

export default WeddingProcess;
