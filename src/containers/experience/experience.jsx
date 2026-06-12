import React, { useState, useEffect } from "react";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { dataStore } from "../../utils/dataStore";
import "./experience.css";

function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const list = await dataStore.getExperiences();
        setExperiences(list);
      } catch (err) {
        console.error("Error fetching experiences:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="rr__experience section__margin" id="experience">
      <div className="rr_experience-heading">
        <h1>Experience</h1>
      </div>

      <div className="rr_experience-container">
        {loading ? (
          <div className="experience-loading">
            <div className="spinner"></div>
            <p>Loading experience timeline...</p>
          </div>
        ) : experiences.length === 0 ? (
          <p className="experience-empty">No experiences listed.</p>
        ) : (
          experiences.map((exp, index) => (
            <div className="rr_experience-card" key={exp.id || index}>
              <div className="rr_experience-card-header">
                <div className="rr_experience-card-title">
                  <h2>{exp.role}</h2>
                  <h3>
                    @ <span className="company-link">{exp.company}</span>
                  </h3>
                </div>
                <div className="rr_experience-card-duration">
                  <span>{exp.duration}</span>
                </div>
              </div>
              <div className="rr_experience-card-body">
                {exp.highlights &&
                  exp.highlights.map((hl, hlIdx) => (
                    <p key={hlIdx}>
                      <AiOutlineDoubleRight /> {hl}
                    </p>
                  ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Experience;
