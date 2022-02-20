import React from "react";
import profilePic from "../../resources/images/me.png";
import "./About.css";
import oracle from "../../resources/logo/oracle.png";
import { FaTerminal } from "react-icons/fa";

function About() {
  return (
    <div className="container custom-container-about">
      <div className="row">
        <div className="col col-lg-7">
          <span className="custom-number">01.</span>
          <span className="custom-heading">About Me</span>
          <hr className="custom-line" />
        </div>
      </div>

      <div className="row justify-content-md-left">
        <div className="col col-lg-7">
          <div className="row custom-line-about">
            Hello! My name is Rahul and I enjoy creating things that live on the
            internet. My interest in web development started back in 2016 when I
            decided to clone Tinder as my learning project — turns out hacking
            together a custom reblog button taught me a lot about PHP, HTML
            &amp; CSS!
          </div>
          <br />
          <div className="row custom-line-about">
            Fast-forward to today, and I’ve had the privilege of working at
            Wipro. My main focus these days is building accessible, inclusive
            products and digital experiences at Oracle for a variety of users.
          </div>
          <br />
          <div className="row custom-line-about">
            Here are a few technologies I’ve been working with recently:
          </div>
          <br />
          <div className="container row">
            <table class="table-dark">
              <tbody>
                <tr className="custom-line-about">
                  <td><FaTerminal /> JavaScript (ES6+)</td>
                  <td><FaTerminal /> Java</td>
                </tr>
                <tr className="custom-line-about">
                  <td><FaTerminal /> Spring Boot</td>
                  <td><FaTerminal /> Python</td>
                </tr>
                <tr className="custom-line-about">
                  <td><FaTerminal /> PL/SQL</td>
                  <td><FaTerminal /> Linux</td>
                </tr>
              </tbody>
            </table>
          </div>
          <br />
        </div>
        <div className="col col-lg-3">
          <img src={profilePic} alt="" height={400} width={300} className="custom-pic"/>
        </div>
      </div>
    </div>
  );
}

export default About;
