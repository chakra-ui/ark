import { Markdown } from '@/components/docs/Markdown'
import { TableOfContent } from '@/components/docs/TableOfContent'
import { PageHeader } from '@/components/shared/PageHeader'
import { findChangelogDocumentByFramework } from '@/lib/contentlayer'
import { Box, Stack } from '@/panda/jsx'
import { notFound } from 'next/navigation'

const Page = async (props: any) => {
  const { params } = props
  const changelog = findChangelogDocumentByFramework(params.framework)

  if (!changelog) {
    return notFound()
  }

  return (
    <Stack direction="row" gap="16">
      <Box maxW={{ base: 'unset', lg: '3xl' }}>
        <PageHeader subHeading="Overview" heading="Changelog" />
        <Markdown markdown={changelog.body.code} />
      </Box>
      <TableOfContent entries={changelog.toc} />
    </Stack>
  )
}

export default Page
