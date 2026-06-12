import React, { useState, useEffect } from "react";
import { dataStore } from "../../utils/dataStore";
import "./projects.css";
import { Project } from "../../components";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const list = await dataStore.getProjects();
        setProjects(list);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="rr__projects section__padding" id="projects">
      <div className="rr__projects-heading">
        <h1>Projects</h1>
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
