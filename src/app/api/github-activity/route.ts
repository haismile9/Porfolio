import { NextResponse } from 'next/server';

const GITHUB_USERNAME = 'haismile9';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const query = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
      repositories(first: 5, orderBy: { field: UPDATED_AT, direction: DESC }, isFork: false) {
        totalCount
        nodes {
          name
          stargazerCount
          primaryLanguage {
            name
            color
          }
        }
      }
    }
  }
`;

export async function GET() {
  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables: { username: GITHUB_USERNAME } }),
      next: { revalidate: 3600 }, // Cache 1 hour
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    return NextResponse.json(data.data.user, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    console.error('GitHub API error:', error);
    return NextResponse.json({ error: 'Failed to fetch GitHub data' }, { status: 500 });
  }
}
