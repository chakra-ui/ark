import { Markdown } from '@/components/docs/Markdown'
import { TableOfContent } from '@/components/docs/TableOfContent'
import { PageHeader } from '@/components/shared/PageHeader'
import { findDocumentByFrameWorkAndId } from '@/lib/contentlayer'
import { Box } from '@/panda/jsx'
import { notFound } from 'next/navigation'

const Page = (props: any) => {
  const { params } = props
  const doc = findDocumentByFrameWorkAndId(params.framework, params.document)

  if (!doc) {
    return notFound()
  }

  return (
    <>
      <Box width={{ base: 'full', xl: '41rem' }}>
        <PageHeader subHeading="Overview" heading={doc.name} />
        <Markdown doc={doc} />
      </Box>
      <TableOfContent entries={doc.toc} />
    </>
  )
}

export default Page
