"use client";

import React, { useState, useEffect } from "react";
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
    { name: "node", url: "/node.svg" },
    { name: "python", url: "/python.svg" },
    { name: "mongo", url: "/mongo.svg" },
  ];

  useEffect(() => {
    let cycleInterval: NodeJS.Timeout | null = null;
    let i = 0;

    if (isHovered) {
      setCurrentLogo(tech_logos[i].name);
      cycleInterval = setInterval(() => {
        i = (i + 1) % tech_logos.length;
        setCurrentLogo(tech_logos[i].name);
      }, 350);
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
        <li className="nav-item">
          <Link href="/">
            <Image src={house} alt="Home" />
          </Link>
        </li>
        <li className="nav-item github">
          <Link href="/github">
            <Image src={octocat} alt="GitHub" />
          </Link>
        </li>
        <li className="nav-item">
          <Link className="tech-link" href="/technologies">
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
            ></div>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/journeys">
            <Image src={journeys} alt="Journeys" />
          </Link>
        </li>
      </ul>
    </header>
  );
}
