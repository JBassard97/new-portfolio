import React from "react";
import Link from "next/link";
import { Project } from "../../interfaces";
import "./ProjectCard.css";

interface ProjectCardProps {
  project: Project;
}

// Component to be used in /projects/all AND /projects/that_use/[technology]
const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="project">
      <Link href={`/projects/${project.name}`}>
        <p>{project.name}</p>
      </Link>
    </div>
  );
};

export default ProjectCard;
