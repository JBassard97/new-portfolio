import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "../../interfaces";
import techToLogo from "../../techToLogo";
// import StackDisplay from "../StackDisplay/StackDisplay";
import "./ProjectCard.css";

interface ProjectCardProps {
  project: Project;
}

// Component to be used in /projects/all AND /projects/that_use/[technology]
const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="project">
      <div className="project-image">
        {/* <Image
          src="/charizard.png"
          alt={project.name}
          width="500"
          height="300"
          layout="responsive"
        /> */}
      </div>
      <div className="project-data">
        <div className="project-text">
          <Link href={`/projects/${project.name}`}>
            <p>{project.name}</p>
          </Link>
          <p>{project.desc}</p>
        </div>
        <div className="stack-type-display">
          {project.hasBackend && <p className="backend">Back End</p>}
          {project.hasFrontend && <p className="frontend">Front End</p>}
          {project.isFullStack && <p className="fullstack">Full Stack</p>}
          {!project.hasBackend &&
            !project.hasFrontend &&
            !project.isFullStack && <p className="other">Other</p>}
        </div>
        <div className="project-links">
          {/* {project.isComplete ? <p>Complete</p> : <p>In Progress</p>} */}
          {project.isDeployed && project.deployedLink.length > 0 && (
            <Link href={project.deployedLink}>
              <div className="deployed-link">
                <p>View</p>
                <Image
                  src="/charizard.png"
                  alt={`${project.name} Link`}
                  width="25"
                  height="25"
                />
              </div>
            </Link>
          )}
        </div>
        {/* <StackDisplay stack={project.stack} /> */}
        <div className="stack-display">
          {project.stack.map((technology, index) => (
            <Image
              className="technology-image"
              key={index}
              src={techToLogo(technology)}
              alt={technology}
              height="25"
              width="25"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
