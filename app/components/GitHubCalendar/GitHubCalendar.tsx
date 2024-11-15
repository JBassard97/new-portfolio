"use client";

import { useEffect, useState } from "react";
import "./GitHubCalendar.css";

interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionData {
  user: {
    contributionsCollection: {
      contributionCalendar: {
        weeks: ContributionWeek[];
        totalContributions: number;
      };
    };
    repositories: { totalCount: number };
  };
}

const GitHubCalendar: React.FC = () => {
  const [contributions, setContributions] = useState<ContributionWeek[]>([]);
  const [contributionTotal, setContributionTotal] = useState(0);
  const [repositoryTotal, setRepositoryTotal] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch the contribution data from the API (no username needed as it's handled on the server-side)
    const fetchContributions = async () => {
      try {
        const response = await fetch("/api/githubContributions");
        const data: ContributionData = await response.json();

        if (data?.user) {
          setContributions(
            data.user.contributionsCollection.contributionCalendar.weeks
          );
          setContributionTotal(
            data.user.contributionsCollection.contributionCalendar
              .totalContributions
          );
          setRepositoryTotal(data.user.repositories.totalCount);
        }

        if (data) {
          console.log(data);
        }
      } catch (error) {
        console.error("Error fetching contributions:", error);
      }
      setLoading(false);
    };

    fetchContributions();
  }, []);

  useEffect(() => {
    console.log("Contribution Total: ", contributionTotal);
    console.log("Repository Total: ", repositoryTotal);
  }, [contributionTotal, repositoryTotal]);

  const getColor = (contributionCount: number): string => {
    if (contributionCount === 0) {
      return "#e0e0e0"; // Light gray for no contributions
    } else if (contributionCount <= 5) {
      return "#76c7c0"; // Light green for 1-5 contributions
    } else if (contributionCount <= 10) {
      return "#a5d6a7"; // Medium green for 6-10 contributions
    } else {
      return "#4caf50"; // Dark green for 11+ contributions
    }
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="contribution-stats">
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
      {/* ------------------------------------ */}
      <div className="contribution-bar">
        {contributions.map((week, weekIndex) => (
          <div key={weekIndex} className="week">
            {week.contributionDays.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className="day"
                style={{
                  backgroundColor: getColor(day.contributionCount),
                }}
                title={`${day.date}: ${day.contributionCount} contributions`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GitHubCalendar;
