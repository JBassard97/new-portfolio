"use client";

import React, { useEffect, useState, useRef } from "react";
import "./journeys-page.css";

interface Month {
  dateString: string;
  main_event: string;
  logs: string[];
}

const Journeys = () => {
  const [timelineData, setTimelineData] = useState<Month[] | null>(null);

  useEffect(() => {
    const fetchTimelineData = async () => {
      try {
        const response = await fetch("/api/timelineData");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);

        // Expecting the data to be an array
        if (Array.isArray(data)) {
          setTimelineData(data);
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Error fetching timeline data:", error);
      }
    };

    fetchTimelineData();
  }, []);

  // Refs for the nodes and time labels
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timeLabelRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log(
            "Observed:",
            entry.target,
            "Intersecting:",
            entry.isIntersecting
          );
          if (entry.isIntersecting) {
            if (entry.target.classList.contains("node")) {
              entry.target.classList.add("scaled");
            } else if (entry.target.classList.contains("time-label")) {
              entry.target.classList.add("visible");
            }
          } else {
            if (entry.target.classList.contains("node")) {
              entry.target.classList.remove("scaled");
            } else if (entry.target.classList.contains("time-label")) {
              entry.target.classList.remove("visible");
            }
          }
        });
      },
      {
        threshold: 0.2, // Lower threshold for more sensitivity
      }
    );

    // Observe nodes
    nodeRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });

    // Observe time labels
    timeLabelRefs.current.forEach((label) => {
      if (label) observer.observe(label);
    });

    return () => {
      nodeRefs.current.forEach((node) => {
        if (node) observer.unobserve(node);
      });
      timeLabelRefs.current.forEach((label) => {
        if (label) observer.unobserve(label);
      });
    };
  }, [timelineData]);

  return (
    <div className="journeys-page">
      {timelineData && timelineData.length > 0 ? (
        <div className="timeline">
          {timelineData.map((month, i) => {
            const spacing = 300;
            const top = i * spacing;

            const nextTop = (i + 1) * spacing;
            const left = parseFloat((Math.sin(i * 0.5) * 50 + 50).toFixed(5));
            const nextLeft = parseFloat(
              (Math.sin((i + 1) * 0.5) * 50 + 50).toFixed(5)
            );

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
                    nodeRefs.current[i] = el;
                  }}
                  className="node"
                  title={month.main_event}
                ></div>
                {i < timelineData.length - 1 && (
                  <div
                    className="line"
                    style={{
                      width: `${length}px`,
                      transform: `rotate(${angle}deg)`,
                    }}
                  >
                    <p
                      ref={(el) => {
                        timeLabelRefs.current[i] = el;
                      }}
                      className="time-label"
                    >
                      {month.dateString}
                    </p>
                    <div className="marks">
                      {month.logs.map((log, index) => (
                        <div key={index} className="mark" title={log}>
                          {" "}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default Journeys;
