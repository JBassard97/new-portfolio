"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import house from "../../../public/house.svg";
import octocat from "../../../public/github.svg";
import "./Header.css";

export default function Header() {
  const [currentLogo, setCurrentLogo] = useState("toolbox");
  const [isHovered, setIsHovered] = useState(false);

  const tech_logos = [
    { name: "vue", url: "/vue.svg" },
    { name: "mongo", url: "/mongo.svg" },
    { name: "node", url: "/node.svg" },
    { name: "react", url: "/react_svg.svg" },
  ];

  useEffect(() => {
    let cycleInterval: NodeJS.Timeout | null = null;
    let i = 0;

    if (isHovered) {
      setCurrentLogo(tech_logos[i].name);
      cycleInterval = setInterval(() => {
        i = (i + 1) % tech_logos.length;
        setCurrentLogo(tech_logos[i].name);
      }, 750);
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
        <li className="nav-item slide-up-1">
          <Link href="/">
            <Image src={house} alt="Home" />
          </Link>
        </li>
        <li className="nav-item slide-up-2">
          <Link href="/github">
            <Image src={octocat} alt="GitHub" />
          </Link>
        </li>
        <li className="nav-item slide-up-3">
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
      </ul>
    </header>
  );
}
