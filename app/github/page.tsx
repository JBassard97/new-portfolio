"use client";

import useSWR from "swr";
import React, { useEffect, useState } from "react";
import GitHubCalendar from "../components/GitHubCalendar/GitHubCalendar";
import GitHubStatBar from "../components/GitHubStatBar/GitHubStatBar";
import CommitKey from "../components/CommitKey/CommitKey";
// import Loading from "../components/Loading/Loading";
import "./github-page.css";

interface RepositoryContribution {
  name: string;
  url: string;
  commitCount: number;
  commitMessages: string[];
}

interface SelectedRepo {
  name: string;
  url: string;
  commitCount: number;
  commitMessages: string[];
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
          defaultBranchRef: {
            target: {
              history: {
                nodes: {
                  message: string;
                  committedDate: string;
                }[];
              };
            };
          };
        };
        contributions: {
          nodes: {
            occurredAt: string;
            commitCount: number;
          }[];
        };
      }[];
    };
    repositories: { totalCount: number };
  };
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const GitHub: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedCommitCount, setSelectedCommitCount] = useState<number | null>(
    null
  );
  const [selectedRepos, setSelectedRepos] = useState<SelectedRepo[] | null>(
    null
  );

  const { data, error, isLoading } = useSWR<ContributionData>(
    "/api/githubContributions",
    fetcher
  );

  console.log(data);

  useEffect(() => {
    if (selectedRepos) {
      console.log(selectedRepos);
    }
  }, [selectedRepos]);

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
                    commitMessages:
                      repo.repository.defaultBranchRef?.target.history.nodes
                        .filter((node) => {
                          // Extract the date portion (everything before 'T') from committedDate
                          const commitDate = node.committedDate.split("T")[0];
                          // Compare the extracted date with the selected day.date
                          return commitDate === day.date;
                        })
                        .map((node) => node.message) || [],
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
        <GitHubCalendar
          contributions={contributions}
          setSelectedDate={setSelectedDate}
          setSelectedCommitCount={setSelectedCommitCount}
          setSelectedRepos={setSelectedRepos}
        />
        {!isLoading && !selectedDate && (
          <p className="centered-grey">(Click a day for more info)</p>
        )}
      </div>
      {selectedDate && (
        <div className="day-info">
          <p>{selectedDate}</p>
          <p>
            {selectedCommitCount} Contribution
            {selectedCommitCount === 1 ? "" : "s"}
          </p>
          {selectedRepos &&
            selectedRepos.map((repo, index) => (
              <div key={index}>
                <a href={repo.url}>
                  <p>
                    {repo.name} ({repo.commitCount} commit
                    {repo.commitCount === 1 ? "" : "s"})
                  </p>
                </a>
                {repo.commitMessages.map((message, index) => (
                  <p key={index}>- {message}</p>
                ))}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default GitHub;
