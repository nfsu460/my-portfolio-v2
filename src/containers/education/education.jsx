import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { dataStore } from "../../utils/dataStore";
import "./education.css";

function Education() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await dataStore.getProfile();
        if (profile && profile.education) {
          setEducation(profile.education);
        }
      } catch (err) {
        console.error("Error fetching education:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="rr__education section__margin" id="education">
      <div className="rr__education-heading">
        <h1>Education</h1>
      </div>

      <div className="rr__education-container">
        {loading ? (
          <div className="education-loading">
            <div className="spinner"></div>
            <p>Loading education history...</p>
          </div>
        ) : education.length === 0 ? (
          <p className="education-empty">No education details listed.</p>
        ) : (
          education.map((edu, index) => (
            <div className="rr__education-card" key={index}>
              <div className="rr__education-card-header">
                <div className="rr__education-card-title">
                  <h2>{edu.degree}</h2>
                  <h3>{edu.institution}</h3>
                </div>
                <div className="rr__education-card-duration">
                  <span>{edu.duration}</span>
                </div>
              </div>
              <div className="rr__education-card-details">
                <div className="rr__education-card-location">
                  <FaMapMarkerAlt />
                  <span>{edu.location}</span>
                </div>
                {edu.grade && (
                  <div className="rr__education-card-grade">
                    <span>{edu.grade}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Education;
