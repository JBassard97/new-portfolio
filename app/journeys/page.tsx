"use client";

import React, { useEffect, useRef } from "react";
import "./journeys-page.css";

const Journeys = () => {
  const numberOfNodes = 50;

  // UseRef for an array of HTMLDivElements
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scaled");
          } else {
            entry.target.classList.remove("scaled");
          }
        });
      },
      {
        threshold: 0.50, // Trigger when 25% of the node is visible
      }
    );

    nodeRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => {
      nodeRefs.current.forEach((node) => {
        if (node) observer.unobserve(node);
      });
    };
  }, []);

  return (
    <div className="journeys-page">
      <div className="timeline">
        {Array.from({ length: numberOfNodes }, (_, i) => {
          const spacing = 250;
          const top = i * spacing;
          const left = Math.sin(i * 0.5) * 50 + 50;

          const nextTop = (i + 1) * spacing;
          const nextLeft = Math.sin((i + 1) * 0.5) * 50 + 50;

          const deltaX = nextLeft - left;
          const deltaY = nextTop - top;
          const length = Math.sqrt(deltaX ** 2 + deltaY ** 2);
          const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

          return (
            <div
              key={i}
              className="vector"
              style={{ top: `${top}px`, left: `${left}px` }}
            >
              <div
                ref={(el) => {
                  nodeRefs.current[i] = el; // Only assignment, no return
                }}
                className="node"
              ></div>
              {i < numberOfNodes - 1 && (
                <div
                  className="line"
                  style={{
                    width: `${length}px`,
                    transform: `rotate(${angle}deg)`,
                  }}
                ></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Journeys;
