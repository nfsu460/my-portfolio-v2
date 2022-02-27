import React, { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../../assets/logo/main-logo.svg";
import resume from "../../assets/files/Resume.pdf";
import "./navbar.css";

function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="rr__navbar">
      <div className="rr__navbar-links_logo">
        <a href="/">
          <img src={logo} alt="" />
        </a>
      </div>
      <div className="rr__navbar-links">
        <div className="rr__navbar-links_container">
          <p>
            <a href="#about">About</a>
          </p>
          <p>
            <a href="#experience">Experience</a>
          </p>
          <p>
            <a href="#projects">Projects</a>
          </p>
          <p>
            <a href="#contacts">Contacts</a>
          </p>
        </div>
      </div>
      <div className="rr__navbar-sign">
        <a href={resume} target="_blank" rel="noreferrer">
          <button type="button">Resume</button>
        </a>
      </div>
      <div className="rr__navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="rr__navbar-menu_container scale-up-center">
            <div className="rr__navbar-menu_container-links">
              <p>
                <a href="#about">About</a>
              </p>
              <p>
                <a href="#experience">Experience</a>
              </p>
              <p>
                <a href="#projects">Projects</a>
              </p>
              <p>
                <a href="#contacts">Contacts</a>
              </p>
            </div>
            <div className="rr__navbar-menu_container-links-sign">
              <a href={resume} target="_blank" rel="noreferrer">
                <button type="button">Resume</button>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
