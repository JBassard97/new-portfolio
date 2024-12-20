"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import techToLogo from "../../../techToLogo";
import { Project } from "../../../interfaces";
import ProjectCard from "@/app/components/ProjectCard/ProjectCard";
import PaginationBar from "@/app/components/PaginationBar/PaginationBar";
import "./that_use.css";

// type RouteParams = { params: { technology: string } };

const ProjectsThatUse = ({ params }: any) => {
  const [technology, setTechnology] = useState<string | null>(null);
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [sortedProjects, setSortedProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Track error state
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState<string>("default"); // Sorting type
  const [itemsPerPage, setItemsPerPage] = useState<number>(10); // Number of projects to show per page

  useEffect(() => {
    const fetchTechParam = async () => {
      const resolvedParams = await params;
      setTechnology(resolvedParams.technology);
    };
    fetchTechParam();
  }, [params]);

  useEffect(() => {
    const fetchProjects = async () => {
      if (technology) {
        setIsLoading(true); // Start loading
        try {
          const response = await fetch(
            `/api/projectData/projectsByTech/${technology}`
          );

          if (!response.ok) {
            throw new Error(
              `No projects found for the technology ${technology}`
            );
          }

          const data = await response.json();
          setProjectsData(data);
          setErrorMessage(null); // Clear any error messages
        } catch (error) {
          console.error(error);
          setProjectsData([]); // Set projectsData to empty array
          setErrorMessage(`No projects found containing "${technology}".`);
        } finally {
          setIsLoading(false); // Stop loading
        }
      }
    };
    fetchProjects();
  }, [technology]);

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
  const totalPages = Math.ceil(projectsData.length / itemsPerPage);

  return (
    <div className="projects-that-use">
      <h4 className="line-1">
        {projectsData ? projectsData.length : 0} Projects That Use
      </h4>
      {technology && (
        <div className="line-2">
          <p>{technology}</p>
          <Image
            src={techToLogo(technology)}
            alt={technology}
            width="30"
            height="30"
          />
        </div>
      )}
      {isLoading ? (
        <p>Loading Projects...</p>
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : projectsData.length > 0 ? (
        <div className="projects-container">
          <PaginationBar
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setSortType={setSortType}
            setItemsPerPage={setItemsPerPage}
            projectsTotal={projectsData.length}
          />
          {currentPageData.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      ) : (
        <div>
          <p>No projects found containing "{technology}"</p>
          <Link href="/technologies">Go Back To Technologies</Link>
        </div>
      )}
    </div>
  );
};

export default ProjectsThatUse;
