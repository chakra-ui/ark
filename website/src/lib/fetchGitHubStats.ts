import type { Endpoints } from '@octokit/types'
import { match } from 'ts-pattern'

type GitHubStats = {
  stars: string
  forks: string
}

type APIResponse = Endpoints['GET /repos/{owner}/{repo}']['response']['data']
const formatter = Intl.NumberFormat('en', { notation: 'compact' })

export const fetchGitHubStats = (): Promise<GitHubStats> =>
  fetch('https://api.github.com/repos/chakra-ui/ark', {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
    },
    next: { revalidate: 60 * 100 },
  })
    .then((res) => res.json())
    .then((data) =>
      match<APIResponse>(data)
        .with({ full_name: 'chakra-ui/ark' }, ({ stargazers_count, forks_count }) => ({
          stars: formatter.format(stargazers_count),
          forks: formatter.format(forks_count),
        }))
        .otherwise(() => {
          throw Error(
            'The GitHub API returned an unexpected response. Did you forget to set the GITHUB_TOKEN environment variable?',
          )
        }),
    )
    .catch(() => ({ stars: '0', forks: '0' }))
