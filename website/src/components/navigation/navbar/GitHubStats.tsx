import { Text } from '@/components/shared/Text'
import { getGitHubRepoStats } from '@/lib/github'
import { Box, HStack } from '@/panda/jsx'
import Link from 'next/link'
import type { ComponentPropsWithoutRef } from 'react'
import { FaGithub } from 'react-icons/fa'
import { GoMarkGithub, GoRepoForked, GoStar } from 'react-icons/go'
import { css } from '../../../../panda/css'
import { hstack, stack } from '../../../../panda/patterns'

type GitHubStatsProps = ComponentPropsWithoutRef<'a'> & { repo: string }
export const GitHubStats = async (props: GitHubStatsProps) => {
  const { repo, ...linkProps } = props
  const data = await getGitHubRepoStats(repo)
  if (!data) {
    return null
  }

  const { full_name: name, html_url: url, stargazers_count, forks_count } = data
  const formatter = Intl.NumberFormat('en', { notation: 'compact' })
  const stars = formatter.format(stargazers_count)
  const forks = formatter.format(forks_count)

  return (
    <Link
      href={url || '#'}
      className={hstack({
        gap: '3',
        fontSize: 'lg',
        py: '2',
        px: '4',
        target: '_blank',
        rel: 'noopener',
        color: 'fg.default',
        transitionProperty: 'base',
        transitionDuration: '100',
        transitionTimingFunction: 'ease-out',
        borderRadius: 'lg',
        _hover: { bg: 'bg.subtle' },
      })}
      {...linkProps}
    >
      <GoMarkGithub />
      <span className={stack({ gap: '0', fontSize: 'sm' })}>
        <span aria-label="GitHub repository name">{name}</span>
        <span className={hstack({ fontSize: 'xs', color: 'fg.muted', gap: '3' })}>
          <span className={hstack({ gap: '1' })} aria-label="GitHub stargazers count">
            <GoStar role="presentation" /> {stars}
          </span>
          <span className={hstack({ gap: '1' })} aria-label="GitHub forks count">
            <GoRepoForked role="presentation" /> {forks}
          </span>
        </span>
      </span>
    </Link>
  )
}

export const GitHubStats2 = async () => {
  const data = await getGitHubRepoStats('chakra-ui/ark')
  if (!data) {
    return null
  }

  const { html_url, stargazers_count, forks_count } = data
  const formatter = Intl.NumberFormat('en', { notation: 'compact' })
  const stars = formatter.format(stargazers_count)
  const forks = formatter.format(forks_count)

  return (
    <Link
      href={html_url}
      target="_blank"
      rel="noopener"
      className={css({
        color: 'fg.emphasized',
        _hover: { color: 'accent.default' },
      })}
    >
      <HStack>
        <FaGithub fontSize="1.25rem" />
        <Box>
          <Text textStyle="sm" fontWeight="medium">
            chakra-ui/ark
          </Text>
          <HStack color="fg.muted">
            <HStack gap="0.5">
              <GoStar fontSize="0.875rem" />
              <Text textStyle="xs">{stars}</Text>
            </HStack>
            <HStack gap="0.5">
              <GoRepoForked fontSize="0.875rem" />
              <Text textStyle="xs">{forks}</Text>
            </HStack>
          </HStack>
        </Box>
      </HStack>
    </Link>
  )
}
