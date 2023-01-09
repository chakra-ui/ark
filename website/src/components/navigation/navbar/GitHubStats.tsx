import { getGitHubRepoStats } from '@/lib/github'
import Link from 'next/link'
import type { ComponentPropsWithoutRef } from 'react'
import { GoMarkGithub, GoRepoForked, GoStar } from 'react-icons/go'
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
      href={url}
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
