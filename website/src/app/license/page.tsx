import type { Metadata } from 'next'
import { Container, Stack } from 'styled-system/jsx'
import { PageHeader } from '~/components/page-header'
import { Prose } from '~/components/ui/prose'
import { MDXContent } from '~/mdx-content'
import { pages } from '.velite'

const license = pages.find((page) => page.id === 'license')

export default function Page() {
  return (
    <Container py="12" maxW="7xl">
      <Stack gap="12" alignItems="center">
        <PageHeader
          heading="Ark UI Plus"
          subHeading="License"
          description="License agreement for Ark UI Plus"
        />
        <Prose>
          <MDXContent code={license?.code ?? ''} />
        </Prose>
      </Stack>
    </Container>
  )
}

export const metadata: Metadata = {
  title: 'Ark UI Plus - License',
  description: 'License agreement for Ark UI Plus',
}
