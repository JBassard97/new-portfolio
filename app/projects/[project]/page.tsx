"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Project } from "@/app/interfaces";
import ProjectCard from "@/app/components/ProjectCard/ProjectCard";
import { infoToLife } from "./infoToLife";
import "./single_project.css";
// type RouteParams = { params: { project: string } };

const SingleProject = ({ params }: any) => {
  const [project, setProject] = useState<any | null>(null);
  const [projectData, setProjectData] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProjectParam = async () => {
      const resolvedParams = await params;
      setProject(resolvedParams.project);
    };
    fetchProjectParam();
  }, [params]);

  useEffect(() => {
    const fetchProjectData = async () => {
      const response = await fetch(`/api/projectData/singleProject/${project}`);
      const data = await response.json();
      console.log(data[0]);
      setProjectData(data[0]);
    };
    if (project) {
      fetchProjectData();
    }
  }, [project]);

  return (
    <div className="single-project">
      <div className="links">
        <Link href="/projects/all">Back to All Projects</Link>
      </div>
      {projectData && (
        <div>
          <ProjectCard project={projectData} index={0} />
          <h2>Tell Me More</h2>
          {projectData.tellMeMore.map((thought, index) => (
            <p
              className="info-point"
              key={index}
              dangerouslySetInnerHTML={{ __html: infoToLife(thought) }}
            />
          ))}
          <h2>What I Learned</h2>
          {projectData.whatILearned.map((lesson, index) => (
            <p
              className="info-point"
              key={index}
              dangerouslySetInnerHTML={{ __html: infoToLife(lesson) }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleProject;
