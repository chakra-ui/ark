import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Box, Flex, Stack, styled } from 'styled-system/jsx'
import { Example } from '~/components/component-preview'
import { Footer } from '~/components/navigation/footer'
import { Pre } from '~/components/pre'
import { TableOfContent } from '~/components/table-of-content'
import { Prose } from '~/components/ui/prose'
import { getSidebarGroups } from '~/lib/sidebar'
import { MDXContent } from '~/mdx-content'

interface Props {
  params: { slug: string[] }
}

export default function Page(props: Props) {
  const page = getPageBySlug(props.params.slug)
  const nextPage = getNextPage(props.params.slug)
  const prevPage = getPrevPage(props.params.slug)

  if (page) {
    return (
      <Flex justifyContent="center" pt="12" mx="auto" width="100%">
        <Box mx="auto" maxW="688px" width="full" minH="lg">
          <Stack gap="16">
            <Prose>
              <styled.h1 fontWeight="bold">{page.title}</styled.h1>
              <styled.p className="lead" color="fg.emphasized">
                {page.description}
              </styled.p>
              <styled.hr />
              <MDXContent code={page.code} />
            </Prose>
            <Footer nextPage={nextPage} prevPage={prevPage} />
          </Stack>
        </Box>

        <Box
          flexGrow="1"
          ps="8"
          width="full"
          maxW="256px"
          minH="lg"
          display={{ base: 'none', xl: 'block' }}
        >
          <TableOfContent entries={page.toc} />
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
export const generateStaticParams = () => pages.map((page) => ({ slug: page.slug.split('/') }))

const getPageBySlug = (slug: string[]) => pages.find((page) => page.slug === slug.join('/'))

const getNextPage = (slug: string[]) => {
  const index = pages.findIndex((page) => page.slug === slug.join('/'))
  return pages[index + 1]
}

const getPrevPage = (slug: string[]) => {
  const index = pages.findIndex((page) => page.slug === slug.join('/'))
  return pages[index - 1]
}
