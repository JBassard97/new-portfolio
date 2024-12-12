"use client";

import React, { useState, useEffect } from "react";
import ProjectCard from "@/app/components/ProjectCard/ProjectCard";
import PaginationBar from "@/app/components/PaginationBar/PaginationBar";
import { Project } from "../../interfaces";
import "./all.css";

const ProjectsAll = () => {
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [sortedProjects, setSortedProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState<string>("default"); // Sorting type
  const [itemsPerPage, setItemsPerPage] = useState<number>(10); // Number of projects to show per page

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const response = await fetch("/api/projectData/allProjects");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProjectsData(data.projectData);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchAllProjects();
  }, []);

  useEffect(() => {
    // Handle sorting whenever projectsData or sortType changes
    const sorted = [...projectsData].sort((a, b) => {
      if (sortType === "name a-z") {
        return a.name.localeCompare(b.name); // Sort by name alphabetically
      } else if (sortType === "name z-a") {
        return b.name.localeCompare(a.name); // Sort by name in reverse alphabetical order (descending)
      } else if (sortType === "stack high-low") {
        return (b.stack?.length || 0) - (a.stack?.length || 0); // Sort by stack size descending } else {
      } else if (sortType === "stack low-high") {
        return (a.stack?.length || 0) - (b.stack?.length || 0); // Sort by stack size ascending
      } else {
        return 0;
      }
    });
    setSortedProjects(sorted);
  }, [projectsData, sortType]);

  // Calculate data for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageData = sortedProjects.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(sortedProjects.length / itemsPerPage);

  return (
    <div className="all-projects">
      <h1>All Projects ({sortedProjects.length})</h1>

      {sortedProjects.length > 0 ? (
        <div className="projects-container">
          <PaginationBar
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setSortType={setSortType} // Pass sorting handler
            setItemsPerPage={setItemsPerPage}
            projectsTotal={projectsData.length}
          />
          {currentPageData.map((project) => (
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
