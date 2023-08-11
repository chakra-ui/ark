// import { Markdown } from '~/components/docs/markdown'
import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Stack } from 'styled-system/jsx'
import { Markdown } from '~/components/markdown'
import { DocsFooter } from '~/components/navigation/docs-footer'
import { TableOfContent } from '~/components/navigation/table-of-content'
import { PageHeader } from '~/components/page-header'
import { findDocumentByFrameWorkAndId } from '~/lib/contentlayer'

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
      <TableOfContent />
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
