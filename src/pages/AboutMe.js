import React from "react";
import { Link } from "react-router-dom";

function AboutMe() {
  return (
    <div className="main-div">
      <h1>About Me</h1>
      <div className="aboutMe">
        <h1>Name: Mohit Gaur</h1>
        <h1>Roll: 1806489</h1>
        <h1>
          Github: <Link to="https://github.com/Mohit-Gaur"> Mohit</Link>
        </h1>
        <h1>Skills: HTML, CSS, Javascript, Flutter, Python</h1>
        <br />
        <h1>Projects:</h1>
        <br />
        <div className="projects-div">
          <h1>
            <ol>
              {projects.map((item) => (
                <li>{item}</li>
              ))}
            </ol>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;

const projects = [
  "Jammify: Built using React",
  "Machine v1.0: Brief description"
];
