"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import Loading from "../Loading/Loading";
import "./GitHubCalendar.css";

interface ContributionDay {
  contributionCount: number;
  date: string;
  repositories: {
    name: string;
    url: string;
    commitCount: number;
  }[];
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface GitHubCalendarProps {
  contributions: ContributionWeek[];
  setSelectedDate: (date: string | null) => void;
  setSelectedCommitCount: (count: number | null) => void;
  setSelectedRepos: (repos: any | null) => void;
}

const GitHubCalendar: React.FC<GitHubCalendarProps> = ({
  contributions,
  setSelectedDate,
  setSelectedCommitCount,
  setSelectedRepos,
}) => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const getColor = useMemo(
    () =>
      (contributionCount: number): string => {
        if (contributionCount === 0) return "#161b21"; // Near-Black
        if (contributionCount <= 5) return "#006e30";
        if (contributionCount <= 10) return "#25a642";
        return "#32d553";
      },
    []
  );

  // Extract unique months from the contributions
  const months = useMemo(() => {
    const allMonths: string[] = [];
    contributions.forEach((week) => {
      const lastDay = week.contributionDays[week.contributionDays.length - 1];
      const date = new Date(lastDay.date);
      const monthName = date.toLocaleString("default", { month: "short" });
      if (!allMonths.includes(monthName)) {
        allMonths.push(monthName);
      }
    });
    return allMonths;
  }, [contributions]);

  // Days of the week labels
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  if (!contributions || contributions.length === 0) {
    return <Loading />;
  }

  return (
    <div className="contribution-bar-wrapper">
      <div className="calendar-container">
        <div className="month-labels">
          {months.map((month, index) => (
            <div
              key={index}
              className="month-label"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {month}
            </div>
          ))}
        </div>
        <div className="row">
          <div className="day-labels">
            {dayLabels.map((day, index) => (
              <div
                key={index}
                className="day-label"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {day}
              </div>
            ))}
          </div>
          <div className="contribution-bar">
            {contributions.map((week, weekIndex) => (
              <div key={weekIndex} className="week">
                {week.contributionDays.map((day, dayIndex) => (
                  <div
                    onClick={() => {
                      setSelectedDate(day.date);
                      setSelectedCommitCount(day.contributionCount);
                      setSelectedRepos(day.repositories);
                      setSelectedDay(day.date);
                    }}
                    key={dayIndex}
                    className={`day ${
                      selectedDay === day.date ? "selected-day" : ""
                    }`}
                    style={{
                      backgroundColor: getColor(day.contributionCount),
                      border: selectedDay === day.date ? "1px solid white" : "",
                    }}
                    data-tooltip-id={`day-tooltip-${weekIndex}-${dayIndex}`}
                    // ! Tooltip HTML
                    data-tooltip-html={`<strong style="text-decoration: underline">${
                      day.date
                    }</strong><br />
                    ${
                      day.contributionCount > 0
                        ? `<strong><span style="color: ${day.contributionCount}; font-size: 20px;">Contributions: ${day.contributionCount}</span></strong><br />`
                        : "No Contributions<br />"
                    }
                    ${
                      day.repositories.length > 0
                        ? day.repositories
                            .map(
                              (repo) =>
                                `<a href="${
                                  repo.url
                                }" target="_blank" style="font-size: 15px; color:${getColor(
                                  repo.commitCount
                                )}">${repo.name}</a> (${
                                  repo.commitCount
                                } commits)`
                            )
                            .join("<br />")
                        : ""
                    }`}

                    // ! End Tooltip HTML
                  >
                    <Tooltip
                      key={`tooltip-${weekIndex}-${dayIndex}`}
                      id={`day-tooltip-${weekIndex}-${dayIndex}`}
                      place="right"
                      style={{
                        zIndex: 2,
                        background: "#161b21",
                      }}
                      opacity={1}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(GitHubCalendar);
