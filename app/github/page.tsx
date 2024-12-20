"use client";

import useSWR from "swr";
// import Link from "next/link";
import GitHubCalendar from "../components/GitHubCalendar/GitHubCalendar";
import GitHubStatBar from "../components/GitHubStatBar/GitHubStatBar";
import CommitKey from "../components/CommitKey/CommitKey";
// import Loading from "../components/Loading/Loading";
import "./github-page.css";

interface RepositoryContribution {
  name: string;
  url: string;
  commitCount: number;
}

interface ContributionDay {
  contributionCount: number;
  date: string;
  repositories: RepositoryContribution[];
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
      commitContributionsByRepository: {
        repository: {
          name: string;
          url: string;
        };
        contributions: {
          nodes: {
            occurredAt: string;
            commitCount: number;
            commit?: {
              message: string;
            };
          }[];
        };
      }[];
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

  console.log(data);

  const contributions =
    data?.user.contributionsCollection.contributionCalendar.weeks.map(
      (week) => ({
        ...week,
        contributionDays: week.contributionDays.map((day) => ({
          ...day,
          repositories:
            data?.user.contributionsCollection.commitContributionsByRepository.flatMap(
              (repo) =>
                repo.contributions.nodes
                  .filter((contribution) =>
                    contribution.occurredAt.startsWith(day.date)
                  )
                  .map((contribution) => ({
                    name: repo.repository.name,
                    url: repo.repository.url,
                    commitCount: contribution.commitCount,
                    message: contribution.commit?.message || "No message", // Include commit message
                  }))
            ) || [],
        })),
      })
    ) || [];

  const contributionTotal =
    data?.user.contributionsCollection.contributionCalendar
      .totalContributions || 0;
  const longestStreak =
    data?.user.contributionsCollection.contributionCalendar.longestStreak || 0;
  const repositoryTotal = data?.user.repositories.totalCount || 0;

  return (
    <div className="github-page">
      <h4 className="underline">JBassard97's GitHub</h4>
      <div className="github-container">
        <GitHubStatBar
          repositoryTotal={repositoryTotal}
          contributionTotal={contributionTotal}
          longestStreak={longestStreak}
        />
        <CommitKey />
        <GitHubCalendar contributions={contributions} />
        <div>
          {!isLoading && (
            <p className="centered-grey">(Click a day for more info)</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GitHub;
