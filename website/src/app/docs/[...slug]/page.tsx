import type { Metadata } from 'next'
import { marked } from 'marked'
import { notFound } from 'next/navigation'
import { css } from 'styled-system/css'
import { Box, Container, Stack } from 'styled-system/jsx'
import { CopyPageWidget } from '~/components/copy-page-widget'
import { DocsFooter } from '~/components/navigation/docs/docs-footer'
import { TableOfContent } from '~/components/table-of-content'
import { Heading } from '~/components/ui/heading'
import { Text } from '~/components/ui/text'
import { getChangelogContent, isChangelogSlug } from '~/lib/changelog'
import { getFramework } from '~/lib/frameworks'
import { getPublicUrl } from '~/lib/get-public-url'
import { cleanupPageContent } from '~/lib/llm-content'
import { getAllPageSlugs, getPageBySlug, getPageNavigation } from '~/lib/pages'
import { getServerContext } from '~/lib/server-context'
import { docsPageToc, findDocsPageBySlug } from '~/lib/source'
import { MDXContent } from '~/mdx-content'

interface Props {
  params: Promise<{ slug: string[] }>
}

const articleClass = css({
  position: 'relative',
  lineHeight: '1.75',
  color: 'var(--colors-prose-body)',
  maxW: '45rem',
  mx: 'auto',
  width: '100%',
})

export default async function Page(props: Props) {
  const params = await props.params
  const framework = await getFramework()
  const slugStr = params.slug.join('/')
  const { prev, next } = getPageNavigation(params.slug)

  const serverContext = getServerContext()
  serverContext.component = params.slug[1]

  const meta = getPageBySlug(params.slug)
  const page = findDocsPageBySlug(slugStr)

  if (!meta || (!page && !isChangelogSlug(slugStr))) return notFound()

  const toc = page ? docsPageToc(page) : []

  return (
    <Container display="flex" py="12" gap="8" justifyContent="center">
      <Stack gap="16" px={{ base: '0', xl: '8' }} width="full">
        <article className={articleClass}>
          <Heading as="h1" fontWeight="bold" size="4xl">
            {meta.title === 'Introduction' ? 'Welcome to Ark UI' : meta.title}
          </Heading>
          <Text className="lead" color="fg.muted" my="6" size="xl">
            {meta.description}
          </Text>
          <Box position={{ md: 'absolute' }} top="2" right="2">
            <CopyPageWidget
              slug={meta.slug}
              framework={framework}
              content={await cleanupPageContent(meta, framework)}
            />
          </Box>
          {isChangelogSlug(slugStr) ? (
            <div dangerouslySetInnerHTML={{ __html: marked.parse(getChangelogContent(framework)) as string }} />
          ) : (
            page && <MDXContent body={page.data.body} />
          )}
        </article>

        <DocsFooter nextPage={next} prevPage={prev} />
      </Stack>
      <Box
        className="scroller"
        flexShrink="0"
        width="14rem"
        hideBelow="xl"
        position="sticky"
        top="calc(var(--navbar-height) + var(--banner-height) + var(--tabbar-height) + 2.5rem)"
        alignSelf="flex-start"
        maxH="calc(100dvh - var(--navbar-height) - var(--banner-height) - var(--tabbar-height) - 4rem)"
        overflowY="auto"
        overscrollBehavior="contain"
      >
        <TableOfContent entries={toc} />
      </Box>
    </Container>
  )
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params
  const page = getPageBySlug(params.slug)

  if (page) {
    return {
      title: page.title,
      description: page.description,
      alternates: { canonical: getPublicUrl(`/docs/${params.slug.join('/')}`) },
    }
  }
  return {}
}

export const generateStaticParams = () => getAllPageSlugs()
