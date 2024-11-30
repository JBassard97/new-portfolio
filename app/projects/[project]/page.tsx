"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

type RouteParams = { params: { project: string } };

const SingleProject = ({ params }: RouteParams) => {
  const [project, setProject] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectParam = async () => {
      const resolvedParams = await params;
      setProject(resolvedParams.project);
    };
    fetchProjectParam();
  }, [params]);

  return (
    <div className="single-project">
      <Link href="/projects/all">Back to All Projects</Link>
      <h1>Single Project: {project}</h1>
    </div>
  );
};

export default SingleProject;
