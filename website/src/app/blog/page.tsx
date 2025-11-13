import NextLink from 'next/link'
import { css } from 'styled-system/css'
import { Box, Container, Flex, Grid, HStack, Stack } from 'styled-system/jsx'
import { Footer } from '~/components/marketing/footer'
import { Navbar } from '~/components/marketing/navbar'
import { Heading } from '~/components/ui/heading'
import { Text } from '~/components/ui/text'
import { Card } from '~/components/ui/card'
import { blogSource } from '~/lib/source'
import type { Metadata } from 'next'

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const sortedBlogs = blogSource
  .getPages()
  .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())

export default async function Page() {
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
      <Box
        position="absolute"
        display={{ base: 'none', sm: 'block' }}
        inset="0"
        height="830px"
        background="radial-gradient(42.48% 42.48% at calc(50% + 100vw / 2) center, #EB5E41 0%, rgba(235, 94, 65, 0) 100%)"
        filter="blur(282px)"
      />
      <Navbar />
      <Container py={{ base: '16', md: '24' }} maxW="5xl" flex="1">
        <Stack>
          <Heading as="h1" size="4xl">
            Ark UI Blog
          </Heading>
          <Text size="lg" color="fg.muted">
            This blog is the official source for the updates from the Ark UI team
          </Text>
        </Stack>

        <Grid columns={{ base: 1, md: 2 }} gap="6" mt="12">
          {sortedBlogs.map((blog, index) => (
            <NextLink href={`/blog/${blog.slugs[0]}`} key={index}>
              <Card.Root h="100%">
                <Card.Header gap="2">
                  <Card.Title textStyle="xl" _hover={{ textDecoration: 'underline' }}>
                    {blog.data.title}
                  </Card.Title>
                  <HStack gap="2" className={css({ color: 'fg.muted', textStyle: 'sm' })}>
                    <Text>{blog.data.author}</Text>
                    <span>/</span>
                    <time dateTime={blog.data.date}>{formatDate(blog.data.date)}</time>
                  </HStack>
                </Card.Header>
                <Card.Body>
                  <Text minH="2lh">{blog.data.description}</Text>
                  <Text mt="2" fontWeight="medium" color="colorPalette.default">
                    Read more
                  </Text>
                </Card.Body>
              </Card.Root>
            </NextLink>
          ))}
        </Grid>
      </Container>

      <Footer />
    </Flex>
  )
}

export const metadata: Metadata = {
  title: 'Blog',
  description: 'This blog is the official source for the updates from the Ark UI team',
}
