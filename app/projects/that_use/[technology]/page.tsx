import React from "react";
import Link from "next/link";
import Image from "next/image";
import techToLogo from "../../techToLogo";
import "./projects_that_use.css";

type RouteParams = { params: { technology: string } };

const ProjectsThatUse = async ({ params }: RouteParams) => {
  const { technology } = await params;

  return (
    <div className="projects-that-use">
      <div className="projects-that-use-header">
        <h4 className="line-1">Projects That Use</h4>
        <div className="line-2">
          <p>{technology}</p>
          <Image
            src={techToLogo(technology)}
            alt={technology}
            width="30"
            height="30"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectsThatUse;
