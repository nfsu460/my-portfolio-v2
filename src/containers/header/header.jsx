import React, { useState, useEffect } from "react";
import { dataStore } from "../../utils/dataStore";
import "./header.css";
import image from "../../assets/images/me.png";

function Header() {
  const [personal, setPersonal] = useState({
    name: "Rahul",
    tagline: "I build things for the web.",
    about: "I’m a software engineer specializing in building (and occasionally designing) exceptional digital experiences. Currently, I’m focused on building accessible, human-centered products at Omnissa (previously Cisco/Oracle)."
  });

  useEffect(() => {
    try {
      const data = dataStore.getProfile();
      if (data && data.personal) {
        setPersonal(data.personal);
      }
    } catch (err) {
      console.error("Error fetching header info:", err);
    }
  }, []);

  return (
    <div className="rr__header section__padding" id="home">
      <div className="rr__header-content">
        <span>Hi, my name is</span>
        <h1 className="gradient__text">{personal.name}</h1>
        <h1 className="gradient__text">{personal.tagline}</h1>
        <br />
        <p>{personal.about}</p>
      </div>

      <div className="rr__header-image">
        <img src={image} alt="avatar" />
      </div>
    </div>
  );
}

export default Header;
