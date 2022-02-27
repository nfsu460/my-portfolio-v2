import React from "react";
import "./contacts.css";
import { AiFillGithub } from "react-icons/ai";
import { SiLeetcode, SiHackerrank } from "react-icons/si";

function Contacts() {
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
          <a href="https://www.github.com/nfsu460">
            <AiFillGithub />
            {" Github"}
          </a>
        </p>
        <p>
          <a href="https://leetcode.com/rahul_rahul/">
            <SiLeetcode />
            {" Leetcode"}
          </a>
        </p>
        <p>
          <a href="https://www.hackerrank.com/Rahul460">
            <SiHackerrank />
            {" HackerRank"}
          </a>
        </p>
      </div>

      <div className="rr__contacts-btn">
        <a href="mailto:nfsu460@gmail.com">
          <p>Say Hello</p>
        </a>
      </div>

      <div className="rr__contacts-copyright">
        <p>@2022 Portfolio. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Contacts;
