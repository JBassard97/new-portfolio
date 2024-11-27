"use client";

import React, { useState, useEffect } from "react";
import "./technologies.css";
import ProficiencyKey from "../components/ProficiencyKey/ProficiencyKey";

interface Technology {
  name: string;
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

  return (
    <div className="tech-page">
      <h4 className="tech-header">Technologies I Use</h4>
      <ProficiencyKey />

      <div className="tech-list">
        {techData &&
          Object.entries(techData).map(([proficiency, technologies]) => (
            <div key={proficiency} className={`tech-category ${proficiency}`}>
              {(technologies as Technology[]).map((tech) => (
                <div key={tech.name} className="tech-item">
                  {tech.name}
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}
