import { Box, Container, Stack } from 'styled-system/jsx'
import { type BlogPost, BlogPosts } from '~/components/blog-posts'
import { Footer } from '~/components/marketing/footer'
import { Navbar } from '~/components/marketing/navbar'
import { Heading } from '~/components/ui/heading'
import { Text } from '~/components/ui/text'
import { blogs } from '~/lib/source'

const posts: BlogPost[] = [...blogs]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .map((blog) => ({
    slug: blog.slug,
    title: blog.title,
    description: blog.description,
    author: blog.author,
    date: blog.date,
    featured: blog.featured,
    type: blog.type,
  }))

export default function Page() {
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
        <BlogPosts posts={posts} />
      </Container>
      <Footer />
    </Box>
  )
}

export const metadata = {
  title: 'Blog',
  description: 'News, updates, and deep dives from the Ark UI team',
}
