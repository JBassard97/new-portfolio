"use client";

import Link from "next/link";
import GitHubCalendar from "../components/GitHubCalendar/GitHubCalendar";
import "./github-page.css";

const GitHub: React.FC = () => {
  return (
    <div className="github-page">
      <h1 className="underline">JBassard97's GitHub</h1>
      <div className="github-container">
        <GitHubCalendar />
      </div>
    </div>
  );
};

export default GitHub;
