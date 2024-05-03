import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Box, Divider, Flex, styled } from 'styled-system/jsx'
import { Example } from '~/components/example'
import { Pre } from '~/components/pre'
import { TableOfContent } from '~/components/table-of-content'
import { Prose } from '~/components/ui/prose'
import { MDXContent } from '~/mdx-content'
import { pages } from '.velite'

interface Props {
  params: { slug: string[] }
}

export default function Page(props: Props) {
  const page = getPageBySlug(props.params.slug)

  if (page) {
    return (
      <Flex justifyContent="center" pt="12" mx="auto" width="100%">
        <Box mx="auto" maxW="688px" width="full" minH="lg">
          <Prose>
            <styled.h1 fontWeight="bold">{page.title}</styled.h1>
            <styled.p className="lead" color="fg.emphasized">
              {page.description}
            </styled.p>
            <styled.hr />
            <MDXContent code={page.code} components={{ Example, pre: Pre }} />
          </Prose>
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

export const generateStaticParams = () => pages.map((page) => ({ slug: page.slug.split('/') }))

const getPageBySlug = (slug: string[]) => pages.find((page) => page.slug === slug.join('/'))
