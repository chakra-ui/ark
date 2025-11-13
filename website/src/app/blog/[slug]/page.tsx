import { ArrowLeftIcon } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { css } from 'styled-system/css'
import { Container, Flex, HStack, Stack } from 'styled-system/jsx'
import { hstack } from 'styled-system/patterns'
import { Footer } from '~/components/marketing/footer'
import { Navbar } from '~/components/marketing/navbar'
import { Heading } from '~/components/ui/heading'
import { Text } from '~/components/ui/text'
import { blogSource } from '~/lib/source'
import { getMDXComponents } from '~/mdx-components'

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const blog = blogSource.getPage([slug])

  if (!blog) {
    return notFound()
  }

  const MDX = blog.data.body

  return (
    <Flex
      direction="column"
      flex="1"
      minH="100%"
      height="100%"
      position="relative"
      backgroundImage="url(/images/pattern.svg)"
      backgroundRepeat="repeat-x"
    >
      <Navbar />
      <Container py={{ base: '16', md: '24' }} maxW="4xl" flex="1">
        <Stack pb="10" gap="3">
          <Link
            href="/blog"
            className={hstack({
              color: 'colorPalette.default',
              alignSelf: 'flex-start',
              gap: '1',
              _icon: {
                width: '4',
                height: '4',
              },
            })}
          >
            <ArrowLeftIcon />
            Back to Blog
          </Link>
          <Heading as="h1" size="5xl" mt="4">
            {blog.data.title}
          </Heading>
          <Text color="fg.muted">{blog.data.description}</Text>
          <HStack mt="4" gap="2" className={css({ color: 'fg.muted' })}>
            <Text>{blog.data.author}</Text>
            <span>/</span>
            <time dateTime={blog.data.date}>{formatDate(blog.data.date)}</time>
          </HStack>
        </Stack>

        <div
          className={css({
            borderBottomWidth: '1px',
            borderColor: 'border.muted',
            mb: '6',
            borderStyle: 'dashed',
          })}
        />

        <article className={css({ lineHeight: '1.75', color: 'var(--colors-prose-body)' })}>
          <MDX components={getMDXComponents()} />
        </article>
      </Container>

      <Footer />
    </Flex>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const blog = blogSource.getPage([slug])
  if (!blog) return {}

  return {
    title: blog.data.title,
    description: blog.data.description,
    openGraph: {
      title: blog.data.title,
      description: blog.data.description,
      type: 'article',
      publishedTime: blog.data.date,
      authors: blog.data.author ? [blog.data.author] : undefined,
      tags: blog.data.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.data.title,
      description: blog.data.description,
    },
  }
}
