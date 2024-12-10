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
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Track error state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  // Calculate data for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageData = projectsData.slice(
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
          />
          {currentPageData.map((project) => (
            <ProjectCard key={project.name} project={project} />
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
