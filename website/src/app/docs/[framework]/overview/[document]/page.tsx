import { DocsFooter } from '@/components/docs/DocsFooter'
import { Markdown } from '@/components/docs/Markdown'
import { TableOfContent } from '@/components/docs/TableOfContent'
import { PageHeader } from '@/components/shared/PageHeader'
import { findDocumentByFrameWorkAndId } from '@/lib/contentlayer'
import { Stack } from '@/panda/jsx'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

const Page = (props: any) => {
  const { params } = props
  const doc = findDocumentByFrameWorkAndId(params.framework, params.document)

  if (!doc) {
    return notFound()
  }

  return (
    <>
      <Stack gap="12" width={{ base: 'full', xl: '41rem' }}>
        <PageHeader subHeading="Overview" heading={doc.name} supportingText={doc.description} />
        <Markdown doc={doc} />
        <DocsFooter doc={doc} />
      </Stack>
      <TableOfContent entries={doc.toc} />
    </>
  )
}

export default Page

export const generateMetadata = async (props: any): Promise<Metadata> => {
  const { params } = props
  const doc = findDocumentByFrameWorkAndId(params.framework, params.document)

  return {
    title: doc?.name,
    description: doc?.description,
  }
}
