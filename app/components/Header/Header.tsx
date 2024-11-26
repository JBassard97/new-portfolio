"use client";

import React, { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import Link from "next/link";
import Image from "next/image";
import house from "../../../public/house.svg";
import octocat from "../../../public/github.svg";
import journeys from "../../../public/journeys.svg";
import "./Header.css";

export default function Header() {
  const [currentLogo, setCurrentLogo] = useState("toolbox");
  const [isHovered, setIsHovered] = useState(false);

  const tech_logos = [
    { name: "react", url: "/react_svg.svg" },
    { name: "vue", url: "/vue.svg" },
    { name: "next", url: "/next-js.svg" },
    { name: "svelte", url: "/svelte.svg" },
    { name: "typescript", url: "/typescript.svg" },
    { name: "python", url: "/python.svg" },
    { name: "php", url: "/php.svg" },
    { name: "mongo", url: "/mongo.svg" },
    { name: "node", url: "/node.svg" },
  ];

  useEffect(() => {
    let cycleInterval: NodeJS.Timeout | null = null;
    let i = 0;

    if (isHovered) {
      setCurrentLogo(tech_logos[i].name);
      cycleInterval = setInterval(() => {
        i = (i + 1) % tech_logos.length;
        setCurrentLogo(tech_logos[i].name);
      }, 500);
    } else {
      setCurrentLogo("toolbox");
    }

    return () => {
      if (cycleInterval) clearInterval(cycleInterval);
    };
  }, [isHovered]);

  return (
    <header>
      <ul>
        <li
          className="nav-item"
          data-tooltip-id="home-tooltip"
          data-tooltip-content="Home"
        >
          <Link href="/">
            <Image src={house} alt="Home" />
          </Link>
        </li>
        <li
          className="nav-item"
          data-tooltip-id="github-tooltip"
          data-tooltip-content="GitHub Profile"
        >
          <Link href="/github">
            <Image src={octocat} alt="GitHub" />
          </Link>
        </li>
        <li
          className="nav-item"
          data-tooltip-id="tech-tooltip"
          data-tooltip-content="Technologies"
        >
          <Link className="tech-link" href="technologies">
            <div
              className={`icon-container ${
                isHovered ? "tech-slide-up" : "toolbox-slide-up"
              }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                backgroundImage: `url(${
                  currentLogo === "toolbox"
                    ? "/toolbox.svg"
                    : tech_logos.find((logo) => logo.name === currentLogo)?.url
                })`,
              }}
              key={currentLogo}
            ></div>
          </Link>
        </li>
        <li
          className="nav-item"
          data-tooltip-id="journey-tooltip"
          data-tooltip-content={"My Journeys"}
        >
          <Link href="/journeys">
            <Image src={journeys} alt="Journeys" />
          </Link>
        </li>
      </ul>

      <Tooltip id="home-tooltip" place="bottom" />
      <Tooltip id="github-tooltip" place="bottom" />
      <Tooltip id="tech-tooltip" place="bottom" />
      <Tooltip id="journey-tooltip" place="bottom" />
    </header>
  );
}