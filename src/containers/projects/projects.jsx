import React from "react";

import "./projects.css";
import { Project } from "../../components";
import myPortfoilioV2 from "../../assets/images/portfolio-v2.png";
import myPortfoilioV1 from "../../assets/images/portfolio-v1.png";
import coronavirusTracker from "../../assets/images/coronavirus-tracker.jpg";
import dutyAllocation from "../../assets/images/duty-allocation.avif";

function Projects() {
  return (
    <div className="rr__projects section__padding" id="projects">
      <div className="rr__projects-heading">
        <h1 className="gradient__text">Projects</h1>
      </div>
      <div className="rr__projects-container">
        <div className="rr__projects-container_group">
          <Project
            imgUrl={myPortfoilioV2}
            title="Portfolio V2"
            text="Portfolio V2 for the showcasing all my works and career as a part of learning project. Built with React Js"
            git_link="https://www.github.com/nfsu460/my-portfolio-v2"
          />
          <Project
            imgUrl={myPortfoilioV1}
            title="Portfolio"
            text="Portfolio V1 for the showcasing all my works and career. Built with Gatsby &amp; JavaScript"
            git_link="https://www.github.com/nfsu460/my-portfolio"
          />
          <Project
            imgUrl={coronavirusTracker}
            title="Coronavirus Tracker"
            text="A minimal, application that displays daily Coronavirus cases and changes from the previous day across the globe. Technologies: Java, Spring Boot, REST API, Bootstrap"
            git_link="https://github.com/nfsu460/coronavirus-tracker"
          />
          <Project
            imgUrl={dutyAllocation}
            title="Department Duty Allocation"
            text="Final Year Project. Technologies: Java (Servlets &amp; JSP), JavaScript, CSS, HTML, MySQL"
            git_link="https://github.com/nfsu460/dutyallotment"
          />
        </div>
      </div>
    </div>
  );
}

export default Projects;
