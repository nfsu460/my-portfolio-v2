import React, { useState, useEffect } from "react";
import { dataStore } from "../../utils/dataStore";
import "./about.css";
import dp from "../../assets/images/dp_3.png";
import { FaTerminal } from "react-icons/fa";

function About() {
  const [aboutText, setAboutText] = useState(
    "Hello! My name is Rahul and I enjoy creating things that live on the internet. My interest in web development started back in 2016 when I decided to clone Tinder as my learning project — turns out hacking together a custom reblog button taught me a lot about PHP, HTML & CSS!\n\nFast-forward to today, and I've had the privilege of working at companies like Wipro, Oracle, Cisco, and Omnissa. My main focus is building scalable backend services, event-driven streaming architectures, and interactive client applications."
  );

  const [skills, setSkills] = useState([
    "Java",
    "Scala",
    "Python",
    "Spring Boot",
    "Apache Kafka",
    "PostgreSQL",
    "AWS",
    "Docker"
  ]);

  useEffect(() => {
    try {
      const data = dataStore.getProfile();
      if (data) {
        if (data.personal && data.personal.about) {
          setAboutText(data.personal.about);
        }
        if (data.skills) {
          // Flatten skills from all categories for the quick tech checklist
          const flatSkills = Object.values(data.skills).flat();
          if (flatSkills.length > 0) {
            setSkills(flatSkills.slice(0, 12)); // Take first 12 skills for display
          }
        }
      }
    } catch (err) {
      console.error("Error fetching about data:", err);
    }
  }, []);

  return (
    <div className="rr__about section__margin" id="about">
      <div className="rr_about-heading">
        <h1 className="gradient__text">About Me</h1>
      </div>
      <div className="rr_about-container">
        <div className="rr_about-content">
          {aboutText.split("\n\n").map((para, i) => (
            <React.Fragment key={i}>
              <p>{para}</p>
              {i < aboutText.split("\n\n").length - 1 && <br />}
            </React.Fragment>
          ))}
          <br />
          <p>Here are a few technologies I&apos;ve been working with recently:</p>
          <br />
          <div className="rr_about-skills">
            {skills.map((skill, index) => (
              <p key={index}>
                <FaTerminal /> {" "}{skill}
              </p>
            ))}
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
