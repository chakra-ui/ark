import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Box, Flex, Stack, styled } from 'styled-system/jsx'
import { Footer } from '~/components/navigation/footer'
import { TableOfContent } from '~/components/table-of-content'
import { Heading } from '~/components/ui/heading'
import { Prose } from '~/components/ui/prose'
import { Text } from '~/components/ui/text'
import { getServerContext } from '~/lib/server-context'
import { getSidebarGroups } from '~/lib/sidebar'
import { MDXContent } from '~/mdx-content'

interface Props {
  params: { framework: string; slug: string[] }
}

export default function Page(props: Props) {
  const serverContext = getServerContext()
  serverContext.framework = props.params.framework
  serverContext.component = props.params.slug[1]

  const currentPage = getPageBySlug(props.params.slug, props.params.framework)
  const nextPage = getNextPage(props.params.slug)
  const prevPage = getPrevPage(props.params.slug)

  if (currentPage) {
    return (
      <Flex mx="auto" pt="12" justifyContent="center" px={{ base: '4', md: '8' }} gap="16">
        <Stack gap="16" maxW="45rem" mx="auto" width="full">
          <Prose css={{ maxWidth: 'full' }}>
            <Heading as="h1" fontWeight="bold">
              {currentPage.title === 'Introduction' ? 'Weclome to Ark UI' : currentPage.title}
            </Heading>
            <Text className="lead" color="fg.muted" mb="6">
              {currentPage.description}
            </Text>
            <MDXContent code={currentPage.code} />
          </Prose>
          <Footer nextPage={nextPage} prevPage={prevPage} />
        </Stack>
        <Box flexGrow="1" width="full" maxW="14rem" display={{ base: 'none', xl: 'block' }}>
          <Box position="fixed">
            <TableOfContent entries={currentPage.toc} />
          </Box>
        </Box>
      </Flex>
    )
  }
  return notFound()
}

export const generateMetadata = (props: Props): Metadata => {
  const page = getPageBySlug(props.params.slug)

  if (page) {
    return { title: page.title, description: page.description }
  }
  return {}
}

const pages = getSidebarGroups().flatMap((group) => group)

export const generateStaticParams = () =>
  ['react', 'solid', 'vue'].flatMap((framework) =>
    pages.map((page) => ({ framework, slug: page.slug.split('/') })),
  )

const getPageBySlug = (slug: string[], framework?: string) => {
  if (framework) {
    return pages.find(
      (page) =>
        page.slug === slug.join('/') && (page.framework === '*' || page.framework === framework),
    )
  }
  return pages.find((page) => page.slug === slug.join('/'))
}

const getNextPage = (slug: string[]) => {
  const index = pages.findIndex((page) => page.slug === slug.join('/'))
  return pages[index + 1]
}

const getPrevPage = (slug: string[]) => {
  const index = pages.findIndex((page) => page.slug === slug.join('/'))
  return pages[index - 1]
}
