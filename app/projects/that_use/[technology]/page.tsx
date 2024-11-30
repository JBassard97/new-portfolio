"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import techToLogo from "../../techToLogo";
import { Project } from "../../../interfaces";
import ProjectCard from "@/app/components/ProjectCard/ProjectCard";
import "./that_use.css";

type RouteParams = { params: { technology: string } };

const ProjectsThatUse = ({ params }: RouteParams) => {
  const [technology, setTechnology] = useState<string | null>(null);
  const [projectsData, setProjectsData] = useState<Project[]>([]);

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
          console.log(data);
          setProjectsData(data);
        } catch (error) {
          console.error("Error fetching project data: ", error);
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
      {projectsData.length > 0 ? (
        <div className="projects-container">
          {projectsData.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      ) : (
        <p>Loading Projects...</p>
      )}
    </div>
  );
};

export default ProjectsThatUse;
