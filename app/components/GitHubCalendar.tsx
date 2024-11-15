"use client";

// components/GitHubCalendar.tsx

import { useEffect, useState } from "react";

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
      };
    };
  };
}

const GitHubCalendar: React.FC = () => {
  const [contributions, setContributions] = useState<ContributionWeek[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch the contribution data from the API (no username needed as it's handled on the server-side)
    const fetchContributions = async () => {
      try {
        const response = await fetch("/api/githubContributions");
        const data: ContributionData = await response.json();

        if (data?.user?.contributionsCollection?.contributionCalendar?.weeks) {
          setContributions(
            data.user.contributionsCollection.contributionCalendar.weeks
          );
        }
      } catch (error) {
        console.error("Error fetching contributions:", error);
      }
      setLoading(false);
    };

    fetchContributions();
  }, []);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
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

      {/* Styles */}
      <style jsx>{`
        .contribution-bar {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-top: 20px;
        }

        .week {
          display: flex;
        }

        .day {
          width: 20px;
          height: 20px;
          margin: 2px;
          border-radius: 3px;
          cursor: pointer;
        }

        .day:hover {
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
};

export default GitHubCalendar;
