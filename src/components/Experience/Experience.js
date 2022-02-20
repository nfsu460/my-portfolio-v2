import React from "react";
import "./Experience.css";
import Accordion from "react-bootstrap/Accordion";
import wipro from "../../resources/logo/wipro.svg";
import oracle from "../../resources/logo/oracle.png";
import { FaTerminal } from "react-icons/fa";

function Experience() {
  return (
    <div className="container custom-container-experience">
      <div className="row">
        <div className="col col-md-7">
          <span className="custom-number">02.</span>
          <span className="custom-heading">Where I’ve Worked</span>
          <hr className="custom-line" />
        </div>
      </div>

      <div className="row">
        <div className="col col-md-10">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <div className="row">
                  <div className="col col-sm-2">
                    <img src={oracle} className="custom-accordion-logo" />
                  </div>
                  <div className="col custom-accordion-role">
                    Application Engineer II
                  </div>
                </div>
              </Accordion.Header>
              <Accordion.Body className="custom-accordion-body">
                <div className="">
                  <span className="custom-body-key">Location: </span>
                  <span className="custom-body-value">Bangalore</span>
                </div>
                <div className="">
                  <span className="custom-body-key">Duration: </span>
                  <span className="custom-body-value">Sep 2021 - Present</span>
                </div>
                <br />
                <p>
                  <FaTerminal /> Developed Multi-Lingual support for Knowledge
                  skill in Oracle Digital Assistant.
                </p>
                <p>
                  <FaTerminal /> Implemented Similar Article for Service Request
                  using Oracle JET (JavaScript Extension Toolkit).
                </p>
                <p>
                  <FaTerminal /> Revised, modularized and updated old code bases
                  to modern development standards, reducing operating costs and
                  improving functionality.
                </p>
                <p>
                  <FaTerminal /> Collaborated with project managers to select
                  ambitious, but realistic coding milestones on pre-release
                  software project development.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <br />
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <div className="row">
                  <div className="col col-sm-2">
                    <img src={wipro} className="custom-accordion-logo" />
                  </div>
                  <div className="col custom-accordion-role">
                    Software Engineer
                  </div>
                </div>
              </Accordion.Header>
              <Accordion.Body className="custom-accordion-body">
                <div className="">
                  <span className="custom-body-key">Location: </span>
                  <span className="custom-body-value">Bangalore</span>
                </div>
                <div className="">
                  <span className="custom-body-key">Duration: </span>
                  <span className="custom-body-value">Jun 2019 - Sep 2021</span>
                </div>
                <br />
                <p>
                  <FaTerminal /> Developed a program using PL/SQL &amp; Python
                  that automatically creates and publishes a report to
                  SharePoint at a defined interval, scheduled with BMC
                  Control-M. Reduced Manual Efforts.
                </p>
                <p>
                  <FaTerminal /> Developed a program that reads a huge data set
                  from binary excel and loads into oracle tables using Python. A
                  PL/SQL Procedure is created to process the data.
                </p>
                <p>
                  <FaTerminal /> Completed Multiple Application Enhancements
                  (Java, PL/SQL, Informatica Workflows).
                </p>
                <p>
                  <FaTerminal /> Critical Bug Fixes in multiple applications and
                  Informatica workflow.
                </p>
                <p>
                  <FaTerminal /> Improved Performance of SQL Queries and PL/SQL
                  Packages, Procedures, and Functions.
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default Experience;
