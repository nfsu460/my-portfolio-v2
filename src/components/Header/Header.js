import React from "react";
import "./Header.css";
import LogoSVG from "../../resources/logo/main-logo.svg";
import Resume from "../../resources/files/Resume.pdf";

function Header() {
  return (
    <div className="navbar row">
      <div className="col float-start">
        <a className=" custom-navbar-brand navbar-brand float-start" href="/">
          <img src={LogoSVG} className="image" width={34} />
        </a>
      </div>
      <div className="col"></div>
      <div className="col"></div>
      <div className="col"></div>
      <div className="col"></div>
      <div className="col"></div>
      <div className="col"></div>
      <div className="col"></div>
      <div className="col"></div>
      <div className="col float-end">
        <a className="btn btn-outline-info" href={Resume} target="_blank">
          Resume
        </a>
      </div>
    </div>
  );
}

export default Header;
