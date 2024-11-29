import React from "react";
import Link from "next/link";

type RouteParams = { params: { project: string } };

const SingleProject = async ({ params }: RouteParams) => {
  const { project } = await params;

  return (
    <div className="single-project">
      <Link href="/projects/all">Back to All Projects</Link>
      <h1>Single Project: {project}</h1>
    </div>
  );
};

export default SingleProject;
