"use client";

import React, { useMemo } from "react";
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
        if (contributionCount === 0) return "#e0e0e0";
        if (contributionCount <= 5) return "#76c7c0";
        if (contributionCount <= 10) return "#a5d6a7";
        return "#4caf50";
      },
    []
  );

  return (
    <div className="contribution-bar">
      {contributions.map((week, weekIndex) => (
        <div key={weekIndex} className="week">
          {week.contributionDays.map((day, dayIndex) => (
            <div
              key={dayIndex}
              className="day"
              style={{ backgroundColor: getColor(day.contributionCount) }}
              title={`${day.date}: ${day.contributionCount} contributions`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default React.memo(GitHubCalendar);
