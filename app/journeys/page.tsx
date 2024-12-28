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
  const [selectedText, setSelectedText] = useState<string | TrustedHTML | null>(
    null
  );
  // Track which elements are in view
  const [visibleElements, setVisibleElements] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const fetchTimelineData = async () => {
      try {
        const response = await fetch("/api/timelineData");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

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

  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timeLabelRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const markRefs = useRef<(HTMLDivElement | null)[][]>([]);

  const handleSelection = (text: string) => {
    setSelectedText((prev) => (prev === text ? null : text));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-id");
          if (!id) return;

          setVisibleElements((prev) => {
            const newSet = new Set(prev);
            if (entry.isIntersecting) {
              newSet.add(id);
            } else {
              newSet.delete(id);
            }
            return newSet;
          });
        });
      },
      {
        threshold: 0.2,
      }
    );

    // Observe nodes
    nodeRefs.current.forEach((node, index) => {
      if (node) {
        node.setAttribute("data-id", `node-${index}`);
        observer.observe(node);
      }
    });

    // Observe time labels
    timeLabelRefs.current.forEach((label, index) => {
      if (label) {
        label.setAttribute("data-id", `label-${index}`);
        observer.observe(label);
      }
    });

    // Observe marks
    markRefs.current.forEach((monthMarks, monthIndex) => {
      monthMarks.forEach((mark, markIndex) => {
        if (mark) {
          mark.setAttribute("data-id", `mark-${monthIndex}-${markIndex}`);
          observer.observe(mark);
        }
      });
    });

    return () => observer.disconnect();
  }, [timelineData]);

  const getElementClasses = (
    baseClass: string,
    elementId: string,
    isSelected: boolean
  ) => {
    const classes = [baseClass];

    if (visibleElements.has(elementId)) {
      if (baseClass === "node") classes.push("scaled");
      if (baseClass === "mark") classes.push("mark-scaled");
      if (baseClass === "time-label") classes.push("visible");
    }

    if (isSelected) classes.push("selected");

    return classes.join(" ");
  };

  return (
    <div className="journeys-page">
      {timelineData && timelineData.length > 0 ? (
        <div className="timeline">
          {timelineData.map((month, i) => {
            const spacing = 350;
            const top = i * spacing;
            const nextTop = (i + 1) * spacing;
            const left = parseFloat((Math.sin(i * 0.5) * 25 + 50).toFixed(5));
            const nextLeft = parseFloat(
              (Math.sin((i + 1) * 0.5) * 25 + 50).toFixed(5)
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
                  className={getElementClasses(
                    "node",
                    `node-${i}`,
                    selectedText === month.main_event
                  )}
                  onClick={() => handleSelection(month.main_event)}
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
                      className={getElementClasses(
                        "time-label",
                        `label-${i}`,
                        false
                      )}
                    >
                      {month.dateString}
                    </p>
                    <div className="marks">
                      {month.logs.map((log, index) => (
                        <div
                          key={index}
                          ref={(el) => {
                            if (!markRefs.current[i]) {
                              markRefs.current[i] = [];
                            }
                            markRefs.current[i][index] = el;
                          }}
                          className={getElementClasses(
                            "mark",
                            `mark-${i}-${index}`,
                            log === selectedText
                          )}
                          onClick={() => handleSelection(log)}
                        ></div>
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

      <div className={`selected-text ${selectedText ? "visible" : ""}`}>
        {selectedText && (
          <p dangerouslySetInnerHTML={{ __html: selectedText as string }}></p>
        )}
      </div>
    </div>
  );
};

export default Journeys;
