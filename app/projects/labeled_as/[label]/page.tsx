"use client";

import React, { useState, useEffect } from "react";
import ProjectCard from "@/app/components/ProjectCard/ProjectCard";
import Link from "next/link";
import { Project } from "@/app/interfaces";
import "./labeled_as.css";

// type RouteParams = { params: { label: string } };

const ProjectsLabeledAs = ({ params }: any) => {
  const [label, setLabel] = useState<string | null>(null);
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Track error state

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

  return (
    <div className="projects-labeled-as">
      <h4 className="line-1">
        {projectsData ? projectsData.length : 0} Projects Labeled As
      </h4>
      {label && <p className="line-2">"{label.replace("_", " ")}"</p>}
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
          <p>No projects found containing "{label}"</p>
          <Link href="/technologies">Go Back To Technologies</Link>
        </div>
      )}
    </div>
  );
};

export default ProjectsLabeledAs;
