"use client";

import useSWR from "swr";
// import Link from "next/link";
import GitHubCalendar from "../components/GitHubCalendar/GitHubCalendar";
import GitHubStatBar from "../components/GitHubStatBar/GitHubStatBar";
import "./github-page.css";

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
        longestStreak: number;
      };
    };
    repositories: { totalCount: number };
  };
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const GitHub: React.FC = () => {
  const { data, error, isLoading } = useSWR<ContributionData>(
    "/api/githubContributions",
    fetcher
  );

  const contributions =
    data?.user.contributionsCollection.contributionCalendar.weeks || [];
  const contributionTotal =
    data?.user.contributionsCollection.contributionCalendar
      .totalContributions || 0;
  const longestStreak =
    data?.user.contributionsCollection.contributionCalendar.longestStreak || 0;
  const repositoryTotal = data?.user.repositories.totalCount || 0;

  return (
    <div className="github-page">
      <h1 className="underline">JBassard97's GitHub</h1>
      <div className="github-container">
        <GitHubStatBar
          repositoryTotal={repositoryTotal}
          contributionTotal={contributionTotal}
          longestStreak={longestStreak}
        />
        <GitHubCalendar contributions={contributions} />
      </div>
    </div>
  );
};

export default GitHub;
