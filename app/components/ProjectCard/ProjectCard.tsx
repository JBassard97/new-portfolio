import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "../../interfaces";
import "./ProjectCard.css";

interface ProjectCardProps {
  project: Project;
}

// Component to be used in /projects/all AND /projects/that_use/[technology]
const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="project">
      <div className="project-image">
        <Image
          src="/charizard.png"
          alt={project.name}
          width="250"
          height="175"
          layout="responsive"
          // objectFit="cover"
        />
      </div>
      <div className="project-data">
        <Link href={`/projects/${project.name}`}>
          <p>{project.name}</p>
        </Link>
        <p>{project.desc}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
