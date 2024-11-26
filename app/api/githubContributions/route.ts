import { NextResponse } from "next/server";

// export async function GET() {
//     const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
//     const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

//     // Updated GraphQL query to fetch contribution data and repositories with createdAt and updatedAt
//     const query = `
//         query ($username: String!) {
//             user(login: $username) {
//                 contributionsCollection {
//                     contributionCalendar {
//                         totalContributions
//                         weeks {
//                             contributionDays {
//                                 contributionCount
//                                 date
//                             }
//                         }
//                     }
//                 }
//                 repositories(first: 100) {
//                     totalCount
//                     nodes {
//                         name
//                         url
//                         createdAt
//                         updatedAt
//                     }
//                 }
//             }
//         }
//     `;

//     // Make the fetch request to GitHub's API
//     try {
//         const response = await fetch("https://api.github.com/graphql", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${GITHUB_TOKEN}`,
//             },
//             body: JSON.stringify({
//                 query,
//                 variables: { username: GITHUB_USERNAME },
//             }),
//         });

//         if (!response.ok) {
//             throw new Error(`GitHub API error: ${response.statusText}`);
//         }

//         const { data } = await response.json();
//         return NextResponse.json(data);
//     } catch (error) {
//         if (error instanceof Error) {
//             return NextResponse.json({ error: error.message }, { status: 500 });
//         }

//         return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 })
//     }
// }

export async function GET() {
    const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

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
                }
            }
        }
    `;

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

        // Calculate the longest streak on the server
        let longestStreak = 0;
        let currentStreak = 0;

        for (const week of data.user.contributionsCollection.contributionCalendar.weeks) {
            for (const day of week.contributionDays) {
                if (day.contributionCount > 0) {
                    currentStreak += 1;
                    longestStreak = Math.max(longestStreak, currentStreak);
                } else {
                    currentStreak = 0;
                }
            }
        }

        // Attach calculated value to the response
        data.user.contributionsCollection.contributionCalendar.longestStreak = longestStreak;

        return NextResponse.json(data, {
            headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=60" },
        });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}