import { Markdown } from '~/components/markdown'
import { DocsFooter } from '~/components/navigation/docs-footer'

import { type Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Stack } from 'styled-system/jsx'
import { ComponentSegmentGroup } from '~/components/navigation/component-segment-group'
import { TableOfContent } from '~/components/navigation/table-of-content'
import { PageHeader } from '~/components/page-header'
import { Playground } from '~/components/playground'
import { findComponentDocumentByFrameworkAndId, getComponentDocuments } from '~/lib/contentlayer'

const Page = (props: any) => {
  const { params } = props
  const doc = findComponentDocumentByFrameworkAndId(params.framework, params.component)

  if (!doc) {
    redirect(`/docs/${params.framework}/overview/introduction`)
  }

  return (
    <>
      <Stack gap="12" width={{ base: 'full', xl: '41rem' }}>
        <PageHeader subHeading="Component" heading={doc.name} supportingText={doc.description} />
        <Stack gap="5">
          <ComponentSegmentGroup basePath={doc.route} />
          <Playground component={doc.id} />
        </Stack>
        <Markdown doc={doc} />
        <DocsFooter doc={doc} />
      </Stack>
      <TableOfContent />
    </>
  )
}

export default Page

export const generateStaticParams = () => {
  const frameworks = ['react', 'solid', 'vue']
  return frameworks.flatMap((framework) =>
    getComponentDocuments(framework).map((component) => ({
      framework,
      component: component.id,
    })),
  )
}

export const generateMetadata = async (props: any): Promise<Metadata> => {
  const { params } = props
  const doc = findComponentDocumentByFrameworkAndId(params.framework, params.component)

  return {
    title: doc?.name,
    description: doc?.description,
  }
}
