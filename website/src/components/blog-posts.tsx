'use client'
import NextLink from 'next/link'
import { useState } from 'react'
import { css, cx } from 'styled-system/css'
import { Grid, HStack, Stack } from 'styled-system/jsx'
import { Heading } from '~/components/ui/heading'
import { Text } from '~/components/ui/text'
import { AuthorAvatars } from '~/components/author-avatars'
import { resolveAuthors } from '~/lib/authors'

export interface BlogPost {
  slug: string
  title: string
  description?: string
  author?: string | string[]
  date: string
  featured?: boolean
  type?: 'article' | 'release'
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })

const categoryLabel = (post: BlogPost) => (post.featured ? 'Featured' : post.type === 'release' ? 'Release' : 'Article')

const cardBase = css({
  display: 'block',
  borderWidth: '1px',
  borderColor: 'border.default',
  rounded: 'l3',
  textDecoration: 'none',
  transitionProperty: 'border-color, background',
  transitionDuration: 'normal',
  transitionTimingFunction: 'default',
  _hover: { borderColor: 'colorPalette.default', bg: 'bg.subtle' },
})

const tagBase = css({
  display: 'inline-flex',
  alignItems: 'center',
  width: 'fit-content',
  textStyle: 'xs',
  fontWeight: 'semibold',
  letterSpacing: 'wide',
  textTransform: 'uppercase',
  rounded: 'l1',
  px: '2',
  py: '0.5',
})

const Tag = ({ label, accent }: { label: string; accent?: boolean }) => (
  <span
    className={cx(
      tagBase,
      accent
        ? css({ bg: 'colorPalette.default', color: 'colorPalette.fg' })
        : css({ bg: 'bg.muted', color: 'fg.muted' }),
    )}
  >
    {label}
  </span>
)

const Meta = ({ author, date }: { author?: string | string[]; date: string }) => {
  const hasAuthor = resolveAuthors(author).length > 0
  return (
    <HStack gap="2" className={css({ color: 'fg.muted', textStyle: 'sm' })}>
      {hasAuthor && (
        <>
          <AuthorAvatars author={author} size={20} />
          <span>·</span>
        </>
      )}
      <time dateTime={date}>{formatDate(date)}</time>
    </HStack>
  )
}

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Articles', value: 'article' },
  { label: 'Releases', value: 'release' },
] as const

type Filter = (typeof filters)[number]['value']

const filterButton = css({
  textStyle: 'sm',
  fontWeight: 'medium',
  color: 'fg.muted',
  rounded: 'l2',
  px: '3',
  py: '1.5',
  cursor: 'pointer',
  transitionProperty: 'color, background',
  transitionDuration: 'normal',
  _hover: { color: 'fg.default' },
  '&[data-active=true]': { bg: 'bg.muted', color: 'fg.default' },
})

export const BlogPosts = ({ posts }: { posts: BlogPost[] }) => {
  const [filter, setFilter] = useState<Filter>('all')

  const featured = posts.find((post) => post.featured) ?? posts[0]
  const rest = posts.filter((post) => post !== featured)
  const visible = filter === 'all' ? rest : posts.filter((post) => (post.type ?? 'article') === filter)

  return (
    <Stack gap="8" mt="12">
      <HStack gap="1">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            data-active={filter === f.value}
            className={filterButton}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </HStack>

      {filter === 'all' && featured && (
        <NextLink href={`/blog/${featured.slug}`} className={cx(cardBase, css({ p: { base: '6', md: '10' } }))}>
          <Stack gap="4">
            <Tag label={categoryLabel(featured)} accent />
            <Heading as="h2" size="2xl" fontWeight="bold" _hover={{ color: 'colorPalette.default' }}>
              {featured.title}
            </Heading>
            <Text color="fg.muted" maxW="42rem">
              {featured.description}
            </Text>
            <Meta author={featured.author} date={featured.date} />
          </Stack>
        </NextLink>
      )}

      {visible.length > 0 && (
        <Grid columns={{ base: 1, md: 2 }} gap="6">
          {visible.map((post) => (
            <NextLink key={post.slug} href={`/blog/${post.slug}`} className={cx(cardBase, css({ p: '6' }))}>
              <Stack gap="3" height="full">
                <Tag label={categoryLabel(post)} />
                <Heading as="h3" size="lg" fontWeight="semibold" _hover={{ color: 'colorPalette.default' }}>
                  {post.title}
                </Heading>
                <Text color="fg.muted" textStyle="sm" flex="1">
                  {post.description}
                </Text>
                <Meta author={post.author} date={post.date} />
              </Stack>
            </NextLink>
          ))}
        </Grid>
      )}
    </Stack>
  )
}
