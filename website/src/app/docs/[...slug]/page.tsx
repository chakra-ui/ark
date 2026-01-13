import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { css } from 'styled-system/css'
import { Box, Container, Stack } from 'styled-system/jsx'
import { CopyPageWidget } from '~/components/copy-page-widget'
import { DocsFooter } from '~/components/navigation/docs/docs-footer'
import { TableOfContent } from '~/components/table-of-content'
import { Heading } from '~/components/ui/heading'
import { Text } from '~/components/ui/text'
import { getFramework } from '~/lib/frameworks'
import { getServerContext } from '~/lib/server-context'
import { getSidebarGroups } from '~/lib/sidebar'
import { MDXContent } from '~/mdx-content'

interface Props {
  params: Promise<{ slug: string[] }>
}

export default async function Page(props: Props) {
  const params = await props.params
  const framework = await getFramework()
  const currentPage = getPageBySlug(params.slug, framework)
  const nextPage = getNextPage(params.slug)
  const prevPage = getPrevPage(params.slug)

  const serverContext = getServerContext()
  serverContext.component = params.slug[1]

  if (currentPage) {
    return (
      <Container display="flex" py="12" gap="8" justifyContent="center">
        <Stack gap="16" px={{ base: '0', xl: '8' }} width="full">
          <article
            className={css({
              position: 'relative',
              lineHeight: '1.75',
              color: 'var(--colors-prose-body)',
              maxW: '45rem',
              mx: 'auto',
              width: '100%',
            })}
          >
            <Heading as="h1" fontWeight="bold" size="4xl">
              {currentPage.title === 'Introduction' ? 'Welcome to Ark UI' : currentPage.title}
            </Heading>
            <Text className="lead" color="fg.muted" my="6" size="xl">
              {currentPage.description}
            </Text>
            <Box position={{ md: 'absolute' }} top="2" right="2">
              <CopyPageWidget slug={currentPage.slug} content={currentPage.llm} />
            </Box>
            <MDXContent code={currentPage.code} />
          </article>

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
const uniquePages = pages.filter((page, index, self) => self.findIndex((p) => p.slug === page.slug) === index)

export const generateStaticParams = () =>
  ['react', 'solid', 'vue'].flatMap((framework) => pages.map((page) => ({ framework, slug: page.slug.split('/') })))

const getPageBySlug = (slug: string[], framework?: string) => {
  if (framework) {
    return pages.find(
      (page) => page.slug === slug.join('/') && (page.framework === '*' || page.framework === framework),
    )
  }
  return pages.find((page) => page.slug === slug.join('/'))
}

const getNextPage = (slug: string[]) => {
  const index = uniquePages.findIndex((page) => page.slug === slug.join('/'))
  return uniquePages[index + 1]
}

const getPrevPage = (slug: string[]) => {
  const index = uniquePages.findIndex((page) => page.slug === slug.join('/'))
  return uniquePages[index - 1]
}
