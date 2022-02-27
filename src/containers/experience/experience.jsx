import React from "react";
import ReactDOM from "react-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { SiWipro, SiOracle } from "react-icons/si";

import "./experience.css";
import { Work } from "../../components";

function Experience() {
  return (
    <div className="rr__experience section__margin" id="experience">
      <div className="rr_experience-heading">
        <h1 className="gradient__text">Experience</h1>
      </div>
      <div className="rr_about-container">
        <Tabs>
          <TabList>
            <Tab>
              <p>
                <SiOracle />
              </p>
            </Tab>
            <Tab>
              <p>
                <SiWipro />
              </p>
            </Tab>
          </TabList>

          <TabPanel>
            <div className="rr_experience-panel_content">
              <div className="rr_experience-panel_content-header">
                <h2>
                  Application Engineer II @{" "}
                  <a href="https://www.oracle.com/">Oracle</a>
                </h2>
                <p>September 2021 - Present</p>
              </div>
              <div className="rr_experience-panel_content-body">
                <p>
                  <AiOutlineDoubleRight /> Developed Multi-Lingual support for
                  Knowledge skill in Oracle Digital Assistant.
                </p>
                <p>
                  <AiOutlineDoubleRight /> Implemented Similar Article for
                  Service Request using Oracle JET (JavaScript Extension
                  Toolkit).
                </p>
                <p>
                  <AiOutlineDoubleRight /> Implemented REST APIs using Helidon
                  (Java based Microservices Framework) for Following Article
                  Feature.
                </p>
                <p>
                  <AiOutlineDoubleRight /> Revised, modularized and updated old
                  code bases to modern development standards, reducing operating
                  costs and improving functionality.
                </p>
                <p>
                  <AiOutlineDoubleRight /> Collaborated with project managers to
                  select ambitious, but realistic coding milestones on
                  pre-release software project development.
                </p>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="rr_experience-panel_content">
              <div className="rr_experience-panel_content-header">
                <h2>
                  Software Engineer @ <a href="https://www.wipro.com/">Wipro</a>
                </h2>
                <p>June 2019 - September 2021</p>
              </div>
              <div className="rr_experience-panel_content-body">
                <p>
                  <AiOutlineDoubleRight /> Developed a program using PL/SQL
                  &amp; Python that automatically creates and publishes a report
                  to Microsoft SharePoint at a defined interval, scheduled with
                  BMC Control-M, Reducing Manual Efforts.
                </p>
                <p>
                  <AiOutlineDoubleRight /> Developed a program that reads a huge
                  data set from binary excel and loads into oracle tables using
                  Python. A PL/SQL Procedure is created to process the data.
                </p>
                <p>
                  <AiOutlineDoubleRight /> Completed Multiple Application
                  Enhancements (Java, PL/SQL &amp; Informatica Workflows).
                </p>
                <p>
                  <AiOutlineDoubleRight /> Critical Bug Fixes in multiple
                  applications and Informatica workflow.
                </p>
                <p>
                  <AiOutlineDoubleRight /> Improved Performance of SQL Queries
                  and PL/SQL Packages, Procedures, and Functions.
                </p>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default Experience;
