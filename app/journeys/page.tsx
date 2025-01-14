"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
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
  const [visibleElements, setVisibleElements] = useState<Set<string>>(
    new Set()
  );
  const [isFadingOut, setIsFadingOut] = useState(false);

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
    const container = document.querySelector(".selected-text-container");

    // Temporarily remove the class to force re-trigger animation
    if (container && container instanceof HTMLElement) {
      container.classList.remove("visible", "fade-out");
      // Trigger reflow (forces browser to reset animation)
      void container.offsetWidth;
    }

    if (selectedText === text) {
      setIsFadingOut(true); // Start fading out
      setTimeout(() => {
        setSelectedText(null); // Clear text after fade-out
        setIsFadingOut(false); // Reset fade-out state
      }, 250); // Match the fade-out duration in CSS
    } else {
      setIsFadingOut(true); // Start fading out of current text
      setTimeout(() => {
        setSelectedText(text); // Change content after fade-out
        setIsFadingOut(false); // Reset fade-out state
      }, 250); // Delay update to match fade-out duration
    }

    if (container) {
      setTimeout(() => {
        container.classList.add("visible");
      }, 250); // Add back the class after a brief delay
    }
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

    nodeRefs.current.forEach((node, index) => {
      if (node) {
        node.setAttribute("data-id", `node-${index}`);
        observer.observe(node);
      }
    });

    timeLabelRefs.current.forEach((label, index) => {
      if (label) {
        label.setAttribute("data-id", `label-${index}`);
        observer.observe(label);
      }
    });

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
        <>
          <h1>My Journey</h1>
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
                  {/* {i < timelineData.length - 1 && ( */}
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
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <p>Loading</p>
      )}
      <div
        className={`selected-text-container ${selectedText ? "visible" : ""} ${
          isFadingOut ? "fade-out" : ""
        }`}
      >
        {selectedText && (
          <div
            className={`selected-text `}
            dangerouslySetInnerHTML={{ __html: selectedText as string }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default Journeys;
