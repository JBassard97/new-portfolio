"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import techToLogo from "../../../techToLogo";
import { Project } from "../../../interfaces";
import ProjectCard from "@/app/components/ProjectCard/ProjectCard";
import "./that_use.css";

type RouteParams = { params: { technology: string } };

const ProjectsThatUse = ({ params }: RouteParams) => {
  const [technology, setTechnology] = useState<string | null>(null);
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Track error state

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
          console.log("Fetched data:", data);
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

  return (
    <div className="projects-that-use">
      <h4 className="line-1">Projects That Use</h4>
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
          {projectsData.map((project) => (
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
