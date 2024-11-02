import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Box, Container, Stack } from 'styled-system/jsx'
import { DocsFooter } from '~/components/navigation/docs/docs-footer'
import { TableOfContent } from '~/components/table-of-content'
import { Heading } from '~/components/ui/heading'
import { Prose } from '~/components/ui/prose'
import { Text } from '~/components/ui/text'
import { getServerContext } from '~/lib/server-context'
import { getSidebarGroups } from '~/lib/sidebar'
import { MDXContent } from '~/mdx-content'

interface Props {
  params: Promise<{ framework: string; slug: string[] }>
}

export default async function Page(props: Props) {
  const params = await props.params

  const currentPage = getPageBySlug(params.slug, params.framework)
  const nextPage = getNextPage(params.slug)
  const prevPage = getPrevPage(params.slug)

  const serverContext = getServerContext()
  serverContext.framework = params.framework
  serverContext.component = params.slug[1]

  if (currentPage) {
    return (
      <Container display="flex" py="12" gap="8" justifyContent="center">
        <Stack gap="16" px={{ base: '0', xl: '8' }} width="full">
          <Prose css={{ maxWidth: '45rem', mx: 'auto', width: '100%' }}>
            <Heading as="h1" fontWeight="bold">
              {currentPage.title === 'Introduction' ? 'Welcome to Ark UI' : currentPage.title}
            </Heading>
            <Text className="lead" color="fg.muted" mb="6">
              {currentPage.description}
            </Text>
            <MDXContent code={currentPage.code} />
          </Prose>
          <DocsFooter nextPage={nextPage} prevPage={prevPage} />
        </Stack>
        <Box flexGrow="1" width="full" maxW="14rem" display={{ base: 'none', xl: 'block' }}>
          <Box position="fixed">
            <TableOfContent entries={currentPage.toc} />
          </Box>
        </Box>
      </Container>
    )
  }
  return notFound()
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params
  const page = getPageBySlug(params.slug)

  if (page) {
    return { title: page.title, description: page.description }
  }
  return {}
}

const pages = getSidebarGroups().flat()

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
