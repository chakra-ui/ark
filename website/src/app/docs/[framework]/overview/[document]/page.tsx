import { Markdown } from '@/components/docs/Markdown'
import { TableOfContent } from '@/components/docs/TableOfContent'
import { PageHeader } from '@/components/shared/PageHeader'
import { findDocumentByFrameWorkAndId } from '@/lib/contentlayer'
import { Box, Stack } from '@/panda/jsx'
import { notFound } from 'next/navigation'

const Page = (props: any) => {
  const { params } = props
  const document = findDocumentByFrameWorkAndId(params.framework, params.document)

  if (!document) {
    return notFound()
  }

  return (
    <Stack direction="row" gap="16" flex="1" justifyContent="flex-end">
      <Box flex="1" maxW={{ base: 'unset', lg: '3xl' }}>
        <PageHeader subHeading="Overview" heading={document.name} />
        <Markdown doc={document} />
      </Box>
      <TableOfContent entries={document.toc} />
    </Stack>
  )
}

export default Page
