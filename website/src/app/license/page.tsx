import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { css } from 'styled-system/css'
import { Container, Stack } from 'styled-system/jsx'
import { PageHeader } from '~/components/page-header'
import { pageSource } from '~/lib/source'
import { getMDXComponents } from '~/mdx-components'

export default function Page() {
  const page = pageSource.getPage(['license'])

  if (!page) {
    return notFound()
  }

  const MDX = page.data.body

  return (
    <Container py={{ base: '16', md: '24' }} maxW="3xl">
      <Stack gap={{ base: '16', md: '24' }} alignItems="center">
        <PageHeader
          heading={page.data.title}
          subHeading={page.data.subtitle ?? ''}
          description={page.data.description}
        />
        <article className={css({ lineHeight: '1.75', color: 'var(--colors-prose-body)' })}>
          <MDX components={getMDXComponents()} />
        </article>
      </Stack>
    </Container>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const page = pageSource.getPage(['license'])

  if (page) {
    return { title: page.data.title, description: page.data.description }
  }
  return {}
}
