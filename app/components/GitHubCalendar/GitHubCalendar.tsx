"use client";

import React, { useMemo } from "react";
import { Tooltip } from "react-tooltip";
import Loading from "../Loading/Loading";
import "./GitHubCalendar.css";

interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface GitHubCalendarProps {
  contributions: ContributionWeek[];
}

const GitHubCalendar: React.FC<GitHubCalendarProps> = ({ contributions }) => {
  const getColor = useMemo(
    () =>
      (contributionCount: number): string => {
        if (contributionCount === 0) return "#161b21";
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
    // const firstMonth = allMonths[0];
    // allMonths.push(firstMonth);
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
                    key={dayIndex}
                    className="day"
                    style={{ backgroundColor: getColor(day.contributionCount) }}
                    data-tooltip-id={`day-tooltip-${weekIndex}-${dayIndex}`}
                    data-tooltip-content={`${day.date}: ${day.contributionCount} contributions`}
                  >
                    <Tooltip
                      key={`tooltip-${weekIndex}-${dayIndex}`}
                      id={`day-tooltip-${weekIndex}-${dayIndex}`}
                      place="top"
                      style={{ zIndex: 10 }}
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
