import React, { useState, useEffect } from "react";
import { dataStore } from "../../utils/dataStore";
import "./projects.css";
import { Project } from "../../components";
import myPortfoilioV2 from "../../assets/images/portfolio-v2.png";
import myPortfoilioV1 from "../../assets/images/portfolio-v1.png";
import coronavirusTracker from "../../assets/images/coronavirus-tracker.jpg";
import dutyAllocation from "../../assets/images/duty-allocation.avif";

const getProjectImage = (id) => {
  switch (id) {
    case "portfolio-v2":
      return myPortfoilioV2;
    case "portfolio-v1":
      return myPortfoilioV1;
    case "coronavirus-tracker":
      return coronavirusTracker;
    case "dutyallotment":
      return dutyAllocation;
    default:
      return null;
  }
};

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const list = dataStore.getProjects();
      setProjects(list);
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="rr__projects section__padding" id="projects">
      <div className="rr__projects-heading">
        <h1 className="gradient__text">Projects</h1>
      </div>
      <div className="rr__projects-container">
        {loading ? (
          <div className="projects-loading">
            <div className="spinner"></div>
            <p>Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          <div className="rr__projects-container_group">
            {projects.map((proj) => (
              <Project
                key={proj.id}
                imgUrl={proj.imgUrl || getProjectImage(proj.id)}
                title={proj.title}
                text={proj.description}
                git_link={proj.gitLink}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;
