import type { Endpoints } from '@octokit/types'

export async function getGitHubRepoStats(repo: string) {
  const TEN_MINUTES = 600
  const res = await fetch(`https://api.github.com/repos/${repo}`, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
    },
    next: { revalidate: TEN_MINUTES },
  })

  if (!res.ok) {
    console.error(
      `Failed to fetch GitHub stats for ${repo}.
Generate a personal access token for GitHub https://github.com/settings/personal-access-tokens/new with read permissions for "Metadata".
Set the environment variable GITHUB_TOKEN. See https://nextjs.org/docs/basic-features/environment-variables for more information.
`,
    )
    return null
  }

  return (await res.json()) as Endpoints['GET /repos/{owner}/{repo}']['response']['data']
}
