"use client";

import React, { useState, useEffect } from "react";
import ProjectCard from "@/app/components/ProjectCard/ProjectCard";
import PaginationBar from "@/app/components/PaginationBar/PaginationBar";
import Link from "next/link";
import { Project } from "@/app/interfaces";
import "./labeled_as.css";

// type RouteParams = { params: { label: string } };

const ProjectsLabeledAs = ({ params }: any) => {
  const [label, setLabel] = useState<string | null>(null);
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [sortedProjects, setSortedProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Track error state
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState<string>("default"); // Sorting type
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  useEffect(() => {
    const fetchLabelParam = async () => {
      const resolvedParams = await params;
      setLabel(resolvedParams.label);
    };
    fetchLabelParam();
  }, [params]);

  useEffect(() => {
    const fetchProjects = async () => {
      if (label) {
        setIsLoading(true);
        try {
          const response = await fetch(
            `/api/projectData/projectsByLabel/${label}`
          );

          if (!response.ok) {
            throw new Error(`No projects found labeled as ${label}`);
          }

          const data = await response.json();
          setProjectsData(data);
          setErrorMessage(null);
        } catch (error) {
          setProjectsData([]);
          setErrorMessage(`No projects found labeled as ${label}`);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchProjects();
  }, [label]);

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
    <div className="projects-labeled-as">
      <h4 className="line-1">
        {projectsData ? sortedProjects.length : 0} Projects Labeled As
      </h4>
      {label && <p className="line-2">"{label.replace("_", " ")}"</p>}
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
          <p>No projects found containing "{label}"</p>
          <Link href="/technologies">Go Back To Technologies</Link>
        </div>
      )}
    </div>
  );
};

export default ProjectsLabeledAs;
