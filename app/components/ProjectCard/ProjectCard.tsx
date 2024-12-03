import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Tooltip } from "react-tooltip";
import { Project } from "../../interfaces";
import techToLogo from "../../techToLogo";
// import StackDisplay from "../StackDisplay/StackDisplay";
import "./ProjectCard.css";

interface ProjectCardProps {
  project: Project;
}

// Component to be used in /projects/all AND /projects/that_use/[technology]
const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const projectTypeToIcon = (type: string) => {
    switch (type) {
      case "Web App":
        return "/globe.svg";
      case "API":
        return "/api.svg";
      case "Terminal App":
        return "/powershell.svg";
      case "Other":
        return "/spiral.svg";
      default:
        return "/charizard.png";
    }
  };

  return (
    <div className="project">
      <Image
        className="project-type-icon"
        src={projectTypeToIcon(project.type)}
        alt={project.type}
        data-tooltip-id={project.type}
        data-tooltip-content={project.type}
        width="25"
        height="25"
      />
      <Tooltip id={project.type} />

      <div className="project-image-container">
        <img src="/charizard.png"></img>
      </div>
      <div className="project-data">
        <div className="project-text">
          <Link href={`/projects/${project.name}`}>
            <p className="project-name">{project.name}</p>
          </Link>
          <p className="project-desc">{project.desc}</p>
        </div>

        <div className="all-buttons">
          <div className="stack-type-display">
            {project.hasBackend && <p className="backend">Back End</p>}
            {project.hasFrontend && <p className="frontend">Front End</p>}
            {project.isFullStack && <p className="fullstack">Full Stack</p>}
            {!project.hasBackend &&
              !project.hasFrontend &&
              !project.isFullStack && <p className="other">Other</p>}
          </div>

          <div className="stack-display">
            {project.stack.map((technology, index) => (
              <Link href={`/projects/that_use/${technology}`} key={index}>
                <Image
                  className="technology-image"
                  src={techToLogo(technology)}
                  alt={technology}
                  height="30"
                  width="30"
                  data-tooltip-id={technology}
                  data-tooltip-content={technology}
                />
                <Tooltip id={technology} />
              </Link>
            ))}
          </div>

          <div className="project-links">
            {/* {project.isComplete ? <p>Complete</p> : <p>In Progress</p>} */}
            {project.isDeployed && project.deployedLink.length > 0 && (
              <Link href={project.deployedLink}>
                <div className="deployed-link">
                  <p>Deployed</p>
                  <Image
                    src={techToLogo(project.hostedOn)}
                    alt="Deployed"
                    width="25"
                    height="25"
                  />
                </div>
              </Link>
            )}
            <Link href={project.githubLink}>
              <div className="github-link">
                <p>View</p>
                <Image src="/github.svg" alt="Github" width="25" height="25" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
