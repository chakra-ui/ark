import NextLink from 'next/link'
import { css, cx } from 'styled-system/css'
import { Box, Container, Grid, HStack, Stack } from 'styled-system/jsx'
import { Footer } from '~/components/marketing/footer'
import { Navbar } from '~/components/marketing/navbar'
import { Heading } from '~/components/ui/heading'
import { Text } from '~/components/ui/text'
import { AuthorAvatars } from '~/components/author-avatars'
import { resolveAuthors } from '~/lib/authors'
import { type BlogMeta, blogs } from '~/lib/source'

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

const sortedBlogs = [...blogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

const categoryLabel = (blog: BlogMeta) => (blog.featured ? 'Featured' : blog.type === 'release' ? 'Release' : 'Article')

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

const tag = cx(
  css({
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
  }),
)

const Tag = ({ label, accent }: { label: string; accent?: boolean }) => (
  <span
    className={cx(
      tag,
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

export default function Page() {
  const featured = sortedBlogs.find((blog) => blog.featured) ?? sortedBlogs[0]
  const rest = sortedBlogs.filter((blog) => blog !== featured)

  return (
    <Box minH="100vh">
      <Navbar />
      <Container maxW="5xl" py={{ base: '16', md: '24' }}>
        <Stack gap="3">
          <Heading as="h1" size="4xl" fontWeight="bold">
            Blog
          </Heading>
          <Text size="lg" color="fg.muted">
            News, updates, and deep dives from the Ark UI team.
          </Text>
        </Stack>

        {featured && (
          <NextLink
            href={`/blog/${featured.slug}`}
            className={cx(cardBase, css({ mt: '12', p: { base: '6', md: '10' } }))}
          >
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

        {rest.length > 0 && (
          <Grid columns={{ base: 1, md: 2 }} gap="6" mt="6">
            {rest.map((blog) => (
              <NextLink key={blog.slug} href={`/blog/${blog.slug}`} className={cx(cardBase, css({ p: '6' }))}>
                <Stack gap="3" height="full">
                  <Tag label={categoryLabel(blog)} />
                  <Heading as="h3" size="lg" fontWeight="semibold" _hover={{ color: 'colorPalette.default' }}>
                    {blog.title}
                  </Heading>
                  <Text color="fg.muted" textStyle="sm" flex="1">
                    {blog.description}
                  </Text>
                  <Meta author={blog.author} date={blog.date} />
                </Stack>
              </NextLink>
            ))}
          </Grid>
        )}
      </Container>
      <Footer />
    </Box>
  )
}

export const metadata = {
  title: 'Blog',
  description: 'News, updates, and deep dives from the Ark UI team',
}
