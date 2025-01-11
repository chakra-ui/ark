import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Container, Stack } from 'styled-system/jsx'
import { PageHeader } from '~/components/page-header'
import { Prose } from '~/components/ui/prose'
import { MDXContent } from '~/mdx-content'
import { pages } from '.velite'

export default function Page() {
  const page = getPageById('license')
  if (!page) {
    return notFound()
  }

  return (
    <Container py={{ base: '16', md: '24' }} maxW="3xl">
      <Stack gap={{ base: '16', md: '24' }} alignItems="center">
        <PageHeader
          heading={page.title}
          subHeading={page.subtitle ?? ''}
          description={page.description}
        />
        <Prose>
          <MDXContent code={page.code} />
        </Prose>
      </Stack>
    </Container>
  )
}

const getPageById = (id: string) => pages.find((page) => page.id === id)

export async function generateMetadata(): Promise<Metadata> {
  const page = getPageById('license')

  if (page) {
    return { title: page.title, description: page.description }
  }
  return {}
}
