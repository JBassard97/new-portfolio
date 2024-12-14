import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Tooltip } from "react-tooltip";
import { Project } from "../../interfaces";
import techToLogo from "../../techToLogo";
// import StackDisplay from "../StackDisplay/StackDisplay";
import "./ProjectCard.css";
import ParallaxCard from "../Parallaxcard/ParallaxCard";

interface ProjectCardProps {
  project: Project;
  index: number;
}

// Component to be used in /projects/all AND /projects/that_use/[technology]
const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const projectTypeToIcon = (type: string) => {
    switch (type) {
      case "Web App":
        return "/globe.svg";
      case "API":
        return "/api.svg";
      case "CLI":
        return "/powershell.svg";
      case "Other":
        return "/spiral.svg";
      default:
        return "/charizard.png";
    }
  };

  const projectTypeToColor = (type: string) => {
    switch (type) {
      case "Web App":
        return "dodgerblue";
      case "API":
        return "indianred";
      case "CLI":
        return "#2e8b57";
      case "Other":
        return "mediumslateblue";
      default:
        return "darkslategrey";
    }
  };

  return (
    <div className="project" style={{ animationDelay: `${index * 0.2}s` }}>
      <div className="top-right-icons">
        <Link
          href={`/projects/labeled_as/${project.type.replace(" ", "_")}`}
          style={{ zIndex: 5 }}
        >
          <Image
            className="type-icon"
            src={projectTypeToIcon(project.type)}
            alt={project.type}
            data-tooltip-id={`${project.name}_${project.type}`}
            data-tooltip-content={project.type}
            data-tooltip-place="left-end"
            width="25"
            height="25"
          />
        </Link>
        <Tooltip
          id={`${project.name}_${project.type}`}
          style={{
            zIndex: 5,
            backgroundColor: projectTypeToColor(project.type),
          }}
          place="left-end"
          opacity={1}
          offset={10}
        />

        <Link
          href={`/projects/labeled_as/${
            project.isComplete ? "Complete" : "In_Progress"
          }`}
          style={{ zIndex: 5 }}
        >
          <Image
            className="complete-icon"
            src={project.isComplete ? "/check.svg" : "/three_dots.svg"}
            alt={project.isComplete ? "Complete" : "Developing"}
            data-tooltip-id={
              project.isComplete
                ? `${project.name}_complete`
                : `${project.name}_in_progress`
            }
            data-tooltip-content={
              project.isComplete ? "Complete" : "In Progress"
            }
            data-tooltip-place="left"
            width="25"
            height="25"
          />
        </Link>
        <Tooltip
          id={
            project.isComplete
              ? `${project.name}_complete`
              : `${project.name}_in_progress`
          }
          style={{
            zIndex: 5,
            backgroundColor: project.isComplete ? "#2e8b57" : "#daa520",
          }}
          place="left"
          opacity={1}
        />
      </div>
      <div className="project-image">
        {/* <img src={project.images[0]}></img> */}
        <ParallaxCard image={project.images[0]} />
      </div>
      <div className="project-data">
        <div className="project-text">
          <Link href={`/projects/${project.name}`}>
            <p className="project-name">{project.name}</p>
          </Link>
          <p className="project-desc">{project.desc}</p>
        </div>
        <div className="allButtons">
          <div className="stack-type-display">
            {project.hasBackend && (
              <Link href="/projects/labeled_as/Backend">
                <p className="backend">Back End</p>
              </Link>
            )}
            {project.hasFrontend && (
              <Link href="/projects/labeled_as/Frontend">
                <p className="frontend">Front End</p>
              </Link>
            )}
            {project.isFullStack && (
              <Link href="/projects/labeled_as/Fullstack">
                <p className="fullstack">Full Stack</p>
              </Link>
            )}
            {!project.hasBackend &&
              !project.hasFrontend &&
              !project.isFullStack && (
                <Link
                  href={`/projects/labeled_as/${project.type.replace(
                    " ",
                    "_"
                  )}`}
                >
                  <p className="other">{project.type}</p>
                </Link>
              )}
          </div>

          <div className="project-links">
            {project.isDeployed && project.deployedLink.length > 0 && (
              <Link href={project.deployedLink} target="_blank">
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
            <Link href={project.githubLink} target="_blank">
              <div className="github-link">
                <p>View</p>
                <Image src="/github.svg" alt="Github" width="25" height="25" />
              </div>
            </Link>
          </div>
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
                data-tooltip-id={`${project.name}_${technology}`}
                data-tooltip-content={technology}
                data-tooltip-place="top"
              />
              <Tooltip
                id={`${project.name}_${technology}`}
                place="top"
                style={{ zIndex: 5 }}
                opacity={1}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
