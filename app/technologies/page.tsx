"use client";

import React, { useState, useEffect } from "react";
import "./technologies.css";
import ProficiencyKey from "../components/ProficiencyKey/ProficiencyKey";
import TechItemButton from "../components/TechItemButton/TechItemButton";
import ParallaxCard from "../components/Parallaxcard/ParallaxCard";
import Link from "next/link";
import Image from "next/image";
import { Tooltip } from "react-tooltip";

interface Technology {
  name: string;
  docs: string;
  icon: string;
  hasProjects: boolean;
  type: string;
  desc: string;
}

interface Proficiency {
  excellent: Technology[];
  comfortable: Technology[];
  familiar: Technology[];
  used_once: Technology[];
}

export default function Technologies() {
  const [techData, setTechData] = useState<Proficiency | null>(null);

  useEffect(() => {
    const fetchTechnologyData = async () => {
      try {
        const response = await fetch("/api/technologyData");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // console.log(data.technologyData);
        setTechData(data.technologyData);
      } catch (error) {
        console.error("Error fetching technology data:", error);
      }
    };

    fetchTechnologyData();
  }, []);

  const techTypeToIcon = (type: string) => {
    switch (type) {
      case "tool":
        return "/toolbox.svg";
      case "database":
        return "/databaseIcon.svg";
      case "language":
        return "/languageIcon.svg";
      case "framework":
        return "/frameworkIcon.svg";
      case "runtime":
        return "/runtimeIcon.svg";
      case "hosting":
        return "/house.svg";
      default:
        return "/charizard.png";
    }
  };

  return (
    <div className="tech-page">
      <h2 className="tech-header">Technologies I Use</h2>
      <ProficiencyKey />

      <div className="tech-list">
        {techData &&
          Object.entries(techData).map(
            ([proficiency, technologies], proficiencyIndex) => (
              <div key={proficiency} className={`tech-category ${proficiency}`}>
                {(technologies as Technology[]).map((tech, techIndex) => (
                  <div
                    key={tech.name}
                    className="tech-item"
                    style={{
                      animationDelay: `${
                        0.07 * (proficiencyIndex * 10 + techIndex) + 0.5
                      }s`,
                    }}
                  >
                    <Image
                      className="tech-type-icon"
                      alt="placeholder"
                      src={techTypeToIcon(tech.type)}
                      width="20"
                      height="20"
                      data-tooltip-id={`tooltip-${tech.name}-${tech.type}`}
                      data-tooltip-content={
                        tech.type.charAt(0).toUpperCase() + tech.type.slice(1)
                      }
                    />
                    <Tooltip
                      id={`tooltip-${tech.name}-${tech.type}`}
                      style={{ zIndex: 10 }}
                      opacity={1}
                    />
                    <Image
                      className="tech-icon"
                      src={tech.icon ? tech.icon : "/charizard.png"}
                      alt={tech.name}
                      width={50}
                      height={50}
                    />
                    <div className="tech-text">
                      <p className="tech-name">{tech.name}</p>
                      {tech.desc && <p className="tech-desc">{tech.desc}</p>}
                    </div>
                    <div className="tech-buttons">
                      <Link href={tech.docs} target="_blank">
                        <TechItemButton
                          text="View Docs"
                          proficiency={proficiency}
                        />
                      </Link>
                      {tech.hasProjects ? (
                        <Link href={`/projects/that_use/${tech.name}`}>
                          <TechItemButton
                            text="Projects"
                            proficiency={proficiency}
                          />
                        </Link>
                      ) : (
                        <TechItemButton text="Projects" proficiency="none" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
      </div>
    </div>
  );
}
