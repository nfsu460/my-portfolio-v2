import React from "react";
import "./about.css";
import dp from "../../assets/images/dp_3.png";
import { FaTerminal } from "react-icons/fa";

function About() {
  const skills = [
    "JavaScript",
    "Java",
    "Spring Boot",
    "Pyhton",
    "PL/SQL",
    "Linux",
  ];

  return (
    <div className="rr__about section__margin" id="about">
      <div className="rr_about-heading">
        <h1 className="gradient__text">About Me</h1>
      </div>
      <div className="rr_about-container">
        <div className="rr_about-content">
          <p>
            Hello! My name is Rahul and I enjoy creating things that live on the
            internet. My interest in web development started back in 2016 when I
            decided to clone Tinder as my learning project — turns out hacking
            together a custom reblog button taught me a lot about PHP, HTML
            &amp; CSS!
          </p>
          <br />
          <p>
            Fast-forward to today, and I&apos;ve had the privilege of working at
            Wipro. My main focus these days is building accessible, inclusive
            products and digital experiences at Oracle for a variety of users.
          </p>
          <br />
          <p>
            Here are a few technologies I&apos;ve been working with recently:
          </p>
          <br />
          <div className="rr_about-skills">
            {skills.map((skill) => (
              <p>
                <FaTerminal /> {(" ", skill)}
              </p>
            ))}
            ;
          </div>
          <br />
        </div>
        <div className="rr_about-image">
          <img src={dp} alt="profile" />
        </div>
      </div>
    </div>
  );
}

export default About;
