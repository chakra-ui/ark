import { Text } from '@/components/shared/Text'
import { HStack, Stack } from '@/panda/jsx'
import Link from 'next/link'
import type { ComponentPropsWithoutRef } from 'react'
import { GoMarkGithub, GoRepoForked, GoStar } from 'react-icons/go'

type GitHubStatsProps = ComponentPropsWithoutRef<'a'> & { repo: string }
export const GitHubStats = async (props: GitHubStatsProps) => {
  const { repo, ...linkProps } = props
  const res = await fetch(`https://api.github.com/repos/${repo}`, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
    },
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

  const data = await res.json()

  const { full_name: name, html_url: url, stargazers_count, forks_count } = data
  const formatter = Intl.NumberFormat('en', { notation: 'compact' })
  const stars = formatter.format(stargazers_count)
  const forks = formatter.format(forks_count)

  return (
    <HStack
      as={Link}
      gap="3"
      fontSize="lg"
      py="2"
      px="4"
      href={url || '#'}
      target="_blank"
      rel="noopener"
      color="fg.default"
      transitionProperty="base"
      transitionDuration="100"
      transitionTimingFunction="ease-out"
      borderRadius="lg"
      _hover={{ bg: 'bg.subtle' }}
      {...linkProps}
    >
      <GoMarkGithub />
      {/* @ts-expect-error wrong typings */}
      <Stack as="span" gap="0" fontSize="sm">
        <Text as="span" aria-label="GitHub repository name">
          {name}
        </Text>
        <HStack as="span" fontSize="xs" color="fg.muted" gap="3">
          <HStack as="span" aria-label="GitHub stargazers count" gap="1">
            <GoStar role="presentation" /> {stars}
          </HStack>
          <HStack as="span" aria-label="GitHub forks count" gap="1">
            <GoRepoForked role="presentation" /> {forks}
          </HStack>
        </HStack>
      </Stack>
    </HStack>
  )
}
