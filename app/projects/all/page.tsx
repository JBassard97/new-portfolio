"use client";

import React, { useState, useEffect } from "react";
import ProjectCard from "@/app/components/ProjectCard/ProjectCard";
import { Project } from "../../interfaces";
import "./all.css";

const ProjectsAll = () => {
  const [projectsData, setProjectsData] = useState<Project[]>([]);

  useEffect(() => {
    const fetchAllProjects = async () => {
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

    fetchAllProjects();
  }, []);
  return (
    <div className="all-projects">
      <h1>All Projects ({projectsData ? projectsData.length : 0})</h1>

      {projectsData.length > 0 ? (
        <div className="projects-container">
          {projectsData.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      ) : (
        <p>Loading projects...</p>
      )}
    </div>
  );
};

export default ProjectsAll;
