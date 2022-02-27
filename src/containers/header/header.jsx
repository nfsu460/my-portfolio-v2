import React from "react";
import "./header.css";
import image from "../../assets/images/me.png";

function Header() {
  return (
    <div className="rr__header section__padding" id="home">
      <div className="rr__header-content">
        <span>Hi, my name is</span>
        <h1 className="gradient__text">Rahul</h1>
        <h1 className="gradient__text">I build things for the web.</h1>
        <br />
        <p>
          I’m a software engineer specializing in building (and occasionally
          designing) exceptional digital experiences. Currently, I’m focused on
          building accessible, human-centered products at{" "}
          <a href="https://www.oracle.com/" target="_blank" rel="noreferrer">
            Oracle
          </a>
          .
        </p>
      </div>

      <div className="rr__header-image">
        <img src={image} alt="" />
      </div>
    </div>
  );
}

export default Header;
