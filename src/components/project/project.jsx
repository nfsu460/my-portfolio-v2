import React from "react";
import "./project.css";
import { BsGithub } from "react-icons/bs";

function Project({ imgUrl, title, text, git_link }) {
  return (
    <div className="rr__project-container_article">
      <div className="rr__project-container_article-image">
        <img src={imgUrl} alt="blog_image" />
      </div>
      <div className="rr__project-container_article-content">
        <div>
          <a href={git_link}>
            <h3>{title}</h3>
          </a>
          <p>{text}</p>
        </div>
        <div className="rr_project-container_atricle-github">
          <p>
            <a href={git_link}>
              <BsGithub />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Project;
