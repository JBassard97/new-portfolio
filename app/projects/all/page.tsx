"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Project {
  name: string;
  githubLink: string;
  images: string[];
  isComplete: boolean;
  isDeployed: boolean;
  deployedLink: string;
  desc: string;
  hasFrontend: boolean;
  hasBackend: boolean;
  isFullStack: boolean;
  type: string;
  hostedOn: string;
  stack: string[];
}

const ProjectsAll = () => {
  const [projectsData, setProjectsData] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await fetch("/api/projectData/allProjects");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data.projectData);
        setProjectsData(data.projectData);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchProjectData();
  }, []);
  return (
    <div className="all-projects">
      <h1>All Projects</h1>

      {projectsData.length > 0 ? (
        <div className="projects-container">
          {projectsData.map((project, index) => (
            <div key={index} className="project">
              <Link href={`/projects/${project.name}`}>
                <p>{project.name}</p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading projects...</p>
      )}
    </div>
  );
};

export default ProjectsAll;
