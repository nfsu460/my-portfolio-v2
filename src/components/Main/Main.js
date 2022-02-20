import React from "react";
import "./Main.css";

function Main() {
  return (
    <div className="custom-container-main">
      <div className="row justify-content-md-left">
        <div class="col col-lg-2"></div>
        <div class="col-lg-8">
          <span className="custom-line-1">Hi, my name is</span>
        </div>
        <div class="col col-lg-2"></div>
      </div>

      <div className="row justify-content-md-left">
        <div class="col col-lg-2"></div>
        <div class="col-lg-8">
        <span className="custom-line-2">Rahul</span>
        </div>
        <div class="col col-lg-2"></div>
      </div>

      <div className="row justify-content-md-left">
        <div class="col col-lg-2"></div>
        <div class="col-lg-8">
        <span className="custom-line-3">I build things for the web.</span>
        </div>
        <div class="col col-lg-2"></div>
      </div>

      <div className="row justify-content-md-left">
        <div class="col col-lg-2"></div>
        <div class="col-lg-8">
        <span className="custom-line-4">
          I’m a software engineer specializing in building (and occasionally
          designing) exceptional digital experiences. Currently, I’m focused on
          building accessible, human-centered products at{" "}
          <a href="https://www.oracle.com">Oracle</a>.
        </span>
        </div>
        <div class="col col-lg-2"></div>
      </div>
    </div>
  );
}

export default Main;
