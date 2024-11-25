"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import house from "../../../public/house.svg";
import octocat from "../../../public/github.svg";
import "./Header.css";

export default function Header() {
  const [currentLogo, setCurrentLogo] = useState("toolbox"); // Start with toolbox logo
  const [isHovered, setIsHovered] = useState(false);

  const tech_logos = [
    { name: "vue", url: "/vue.svg" },
    { name: "mongo", url: "/mongo.svg" },
    { name: "node", url: "/node.svg" },
    { name: "react", url: "/react_svg.svg" },
  ];

  useEffect(() => {
    let cycleInterval: NodeJS.Timeout | null = null;
    let i = 0; // Start from the first logo in the cycling array

    if (isHovered) {
      // If hovered, start from the first logo (vue)
      setCurrentLogo(tech_logos[i].name); // Set the first logo immediately
      cycleInterval = setInterval(() => {
        i = (i + 1) % tech_logos.length; // Cycle through the tech_logos array
        setCurrentLogo(tech_logos[i].name);
      }, 1000); // Change every 1 second
    } else {
      // Reset to toolbox logo when not hovering
      setCurrentLogo("toolbox");
    }

    return () => {
      if (cycleInterval) clearInterval(cycleInterval);
    };
  }, [isHovered]);

  return (
    <header>
      <ul>
        <Link href="/">
          <Image src={house} alt="Home" />
        </Link>
        <Link href="/github">
          <Image src={octocat} alt="GitHub" />
        </Link>
        <Link className="tech-link" href="technologies">
          <div
            className={`icon-container ${isHovered ? "slide-up" : ""}`} // Apply slide-up only when hovering
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              backgroundImage: `url(${
                currentLogo === "toolbox"
                  ? "/toolbox.svg"
                  : tech_logos.find((logo) => logo.name === currentLogo)?.url
              })`,
            }}
            key={currentLogo} // Use key to force re-render for animation
          ></div>
        </Link>
      </ul>
    </header>
  );
}
