"use client";

import React, { useState, useEffect } from "react";
import "./GitHubStatBar.css";

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
  const [animatedRepos, setAnimatedRepos] = useState(0);
  const [animatedContributions, setAnimatedContributions] = useState(0);
  const [animatedStreak, setAnimatedStreak] = useState(0);

  useEffect(() => {
    // Animation duration in milliseconds
    const duration = 1000;
    // Number of steps in the animation
    const steps = 30;
    const interval = duration / steps;

    // Animate repository count
    const repoIncrement = repositoryTotal / steps;
    let currentRepos = 0;
    const repoTimer = setInterval(() => {
      if (currentRepos < repositoryTotal) {
        currentRepos += repoIncrement;
        setAnimatedRepos(Math.min(Math.round(currentRepos), repositoryTotal));
      } else {
        clearInterval(repoTimer);
      }
    }, interval);

    // Animate contribution count
    const contribIncrement = contributionTotal / steps;
    let currentContrib = 0;
    const contribTimer = setInterval(() => {
      if (currentContrib < contributionTotal) {
        currentContrib += contribIncrement;
        setAnimatedContributions(
          Math.min(Math.round(currentContrib), contributionTotal)
        );
      } else {
        clearInterval(contribTimer);
      }
    }, interval);

    // Animate streak count
    const streakIncrement = longestStreak / steps;
    let currentStreak = 0;
    const streakTimer = setInterval(() => {
      if (currentStreak < longestStreak) {
        currentStreak += streakIncrement;
        setAnimatedStreak(Math.min(Math.round(currentStreak), longestStreak));
      } else {
        clearInterval(streakTimer);
      }
    }, interval);

    // Cleanup intervals on component unmount or when props change
    return () => {
      clearInterval(repoTimer);
      clearInterval(contribTimer);
      clearInterval(streakTimer);
    };
  }, [repositoryTotal, contributionTotal, longestStreak]);

  return (
    <div className="stats-bar">
      <div className="stat-block">
        <p>{animatedRepos.toLocaleString()}</p>
        <p className="stat-label">Public</p>
        <p className="stat-label">Repos</p>
      </div>
      <div className="stat-block">
        <p>{animatedContributions.toLocaleString()}</p>
        <p className="stat-label">Public</p>
        <p className="stat-label">Contributions</p>
      </div>
      <div className="stat-block">
        <p>{animatedStreak.toLocaleString()} Day</p>
        <p className="stat-label">Longest</p>
        <p className="stat-label">Streak</p>
      </div>
    </div>
  );
};

export default GitHubStatBar;
