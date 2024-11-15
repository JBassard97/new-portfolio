"use client";

import Link from "next/link";
import GitHubCalendar from "../components/GitHubCalendar";

const GitHub: React.FC = () => {
  return (
    <div>
      <h1>My GitHub Contributions</h1>
      <GitHubCalendar />
    </div>
  );
};

export default GitHub;
