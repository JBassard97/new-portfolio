import { NextResponse } from "next/server";

export async function GET() {
    const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

    // Updated GraphQL query to fetch contribution data and repositories with createdAt and updatedAt
    const query = `
        query ($username: String!) {
            user(login: $username) {
                contributionsCollection {
                    contributionCalendar {
                        totalContributions
                        weeks {
                            contributionDays {
                                contributionCount
                                date
                            }
                        }
                    }
                }
                repositories(first: 100) {
                    totalCount
                    nodes {
                        name
                        url
                        createdAt
                        updatedAt
                    }
                }
            }
        }
    `;

    // Make the fetch request to GitHub's API
    try {
        const response = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${GITHUB_TOKEN}`,
            },
            body: JSON.stringify({
                query,
                variables: { username: GITHUB_USERNAME },
            }),
        });

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.statusText}`);
        }

        const { data } = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
