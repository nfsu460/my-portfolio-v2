import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { SiWipro, SiOracle, SiCisco } from "react-icons/si";
import { FaBriefcase } from "react-icons/fa";
import { dataStore } from "../../utils/dataStore";
import "./experience.css";

const getCompanyIcon = (company) => {
  const name = company.toLowerCase();
  if (name.includes("oracle")) return <SiOracle />;
  if (name.includes("wipro")) return <SiWipro />;
  if (name.includes("cisco")) return <SiCisco />;
  return <FaBriefcase />;
};

function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const list = dataStore.getExperiences();
      setExperiences(list);
    } catch (err) {
      console.error("Error fetching experiences:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="rr__experience section__margin" id="experience">
      <div className="rr_experience-heading">
        <h1 className="gradient__text">Experience</h1>
      </div>

      <div className="rr_about-container">
        {loading ? (
          <div className="experience-loading">
            <div className="spinner"></div>
            <p>Loading experience timeline...</p>
          </div>
        ) : experiences.length === 0 ? (
          <p>No experiences listed.</p>
        ) : (
          <Tabs>
            <TabList>
              {experiences.map((exp) => (
                <Tab key={exp.id}>
                  <div className="tab-icon-wrapper">
                    {getCompanyIcon(exp.company)}
                    <span className="tab-company-name">{exp.company}</span>
                  </div>
                </Tab>
              ))}
            </TabList>

            {experiences.map((exp) => (
              <TabPanel key={exp.id}>
                <div className="rr_experience-panel_content">
                  <div className="rr_experience-panel_content-header">
                    <h2>
                      {exp.role} @{" "}
                      <span className="company-link">{exp.company}</span>
                    </h2>
                    <p>{exp.duration}</p>
                  </div>
                  <div className="rr_experience-panel_content-body">
                    {exp.highlights &&
                      exp.highlights.map((hl, index) => (
                        <p key={index}>
                          <AiOutlineDoubleRight /> {hl}
                        </p>
                      ))}
                  </div>
                </div>
              </TabPanel>
            ))}
          </Tabs>
        )}
      </div>
    </div>
  );
}

export default Experience;
