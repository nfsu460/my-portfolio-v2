import React, { useState, useEffect } from "react";
import { dataStore } from "../../utils/dataStore";
import "./contacts.css";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { SiLeetcode, SiHackerrank } from "react-icons/si";

function Contacts() {
  const [contactInfo, setContactInfo] = useState({
    email: "nfsu460@gmail.com",
    github: "https://www.github.com/nfsu460",
    linkedin: "https://linkedin.com/in/rahul460",
    leetcode: "https://leetcode.com/rahul_rahul/",
    hackerrank: "https://www.hackerrank.com/Rahul460"
  });

  useEffect(() => {
    try {
      const data = dataStore.getProfile();
      if (data && data.personal) {
        setContactInfo({
          email: data.personal.email || "nfsu460@gmail.com",
          github: data.personal.github || "https://www.github.com/nfsu460",
          linkedin: data.personal.linkedin || "https://linkedin.com/in/rahul460",
          leetcode: data.personal.leetcode || "https://leetcode.com/rahul_rahul/",
          hackerrank: data.personal.hackerrank || "https://www.hackerrank.com/Rahul460"
        });
      }
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  }, []);

  return (
    <div className="rr__contacts section__padding" id="contacts">
      <div className="rr__contacts-heading">
        <h1 className="gradient__text">Get In Touch</h1>
        <p>
          Although I’m not currently looking for any new opportunities, my inbox
          is always open. Whether you have a question or just want to say hi,
          I’ll try my best to get back to you!
        </p>
        <br />
        <p>
          <a
            href={contactInfo.github}
            target="_blank"
            rel="noreferrer"
          >
            <AiFillGithub />
            {" Github"}
          </a>
        </p>
        <p>
          <a
            href={contactInfo.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <AiFillLinkedin />
            {" LinkedIn"}
          </a>
        </p>
        <p>
          <a
            href={contactInfo.leetcode}
            target="_blank"
            rel="noreferrer"
          >
            <SiLeetcode />
            {" Leetcode"}
          </a>
        </p>
        <p>
          <a
            href={contactInfo.hackerrank}
            target="_blank"
            rel="noreferrer"
          >
            <SiHackerrank />
            {" HackerRank"}
          </a>
        </p>
      </div>

      <div className="rr__contacts-btn">
        <a href={`mailto:${contactInfo.email}`}>
          <p>Say Hello</p>
        </a>
      </div>

      <div className="rr__contacts-copyright">
        <p>@{new Date().getFullYear()} Portfolio. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Contacts;
