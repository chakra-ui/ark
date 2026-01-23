import { pages } from '.velite'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { css } from 'styled-system/css'
import { Container, Stack } from 'styled-system/jsx'
import { PageHeader } from '~/components/page-header'
import { MDXContent } from '~/mdx-content'

export default function Page() {
  const page = getPageById('license')
  if (!page) {
    return notFound()
  }

  return (
    <Container py={{ base: '16', md: '24' }} maxW="3xl">
      <Stack gap={{ base: '16', md: '24' }} alignItems="center">
        <PageHeader heading={page.title} subHeading={page.subtitle ?? ''} description={page.description} />
        <article className={css({ lineHeight: '1.75', color: 'var(--colors-prose-body)' })}>
          <MDXContent code={page.code} />
        </article>
      </Stack>
    </Container>
  )
}

const getPageById = (id: string) => pages.find((page) => page.id === id)

export async function generateMetadata(): Promise<Metadata> {
  const page = getPageById('license')
  if (!page) return {}
  return {
    title: page.title,
    description: page.description,
    openGraph: { url: '/license', description: page.description },
  }
}
