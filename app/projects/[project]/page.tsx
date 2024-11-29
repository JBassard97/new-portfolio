import React from "react";
import Link from "next/link";

type RouteParams = { params: { project: string } };

const SingleProject = async ({ params }: RouteParams) => {
  const { project } = await params;

  return <h1>Single Project: {project}</h1>;
};
