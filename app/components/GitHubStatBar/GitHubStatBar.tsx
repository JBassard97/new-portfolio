import React from "react";
import "./GitHubStatBar.css"

interface GitHubStatBarProps {
  repositoryTotal: number;
  contributionTotal: number;
  longestStreak: number;
}

const GitHubStatBar: React.FC<GitHubStatBarProps> = ({
  repositoryTotal,
  contributionTotal,
  longestStreak,
}) => {
  return (
    <div className="stats-bar">
      <div className="stat-block">
        <p>{repositoryTotal}</p>
        <p>Public Repos</p>
      </div>
      <div className="stat-block">
        <p>{contributionTotal}</p>
        <p>Contributions</p>
      </div>
      <div className="stat-block">
        <p>{longestStreak}</p>
        <p>Longest Streak</p>
      </div>
    </div>
  );
};

export default GitHubStatBar;
