"use client";

import React, { useState, useEffect } from "react";
import ProjectCard from "@/app/components/ProjectCard/ProjectCard";
import PaginationBar from "@/app/components/PaginationBar/PaginationBar";
import { Project } from "../../interfaces";
import "./all.css";

const ProjectsAll = () => {
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of projects to show per page

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

  // Calculate data for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageData = projectsData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(projectsData.length / itemsPerPage);

  return (
    <div className="all-projects">
      <h1>All Projects ({projectsData.length})</h1>

      {projectsData.length > 0 ? (
        <>
          {/* <PaginationBar
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          /> */}

          <div className="projects-container">
            <PaginationBar
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
            {currentPageData.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </>
      ) : (
        <p>Loading projects...</p>
      )}
    </div>
  );
};

export default ProjectsAll;
