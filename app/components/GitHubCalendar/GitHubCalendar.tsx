"use client";

import React, { useMemo } from "react";
import "./GitHubCalendar.css";
import { WrappedNextRouterError } from "next/dist/server/route-modules/app-route/module";

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

  return (
    <div className="contribution-bar-wrapper">
      <div className="month-labels"></div>
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
    </div>
  );
};

export default React.memo(GitHubCalendar);
