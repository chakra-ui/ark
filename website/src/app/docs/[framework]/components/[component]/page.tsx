import { Markdown } from '@/components/docs/Markdown'
import { Playground } from '@/components/docs/Playground'
import { TableOfContent } from '@/components/docs/TableOfContent'
import { ComponentTabs } from '@/components/navigation/ComponentTabs'
import { PageHeader } from '@/components/shared/PageHeader'
import { findComponentDocumentByFrameworkAndId, getComponentDocuments } from '@/lib/contentlayer'
import { Box } from '@/panda/jsx'
import { redirect } from 'next/navigation'
import { Stack } from 'panda/jsx/stack'

const Page = (props: any) => {
  const { params } = props
  const doc = findComponentDocumentByFrameworkAndId(params.framework, params.component)

  if (!doc) {
    redirect(`/docs/${params.framework}/overview/introduction`)
  }

  return (
    <>
      <Box width={{ base: 'full', xl: '41rem' }}>
        <Stack gap="12">
          <PageHeader subHeading="Component" heading={doc.name} supportingText={doc.description} />
          <ComponentTabs basePath={doc.route} />
          <Playground component={doc.id} />
          <Markdown doc={doc} />
        </Stack>
      </Box>
      <TableOfContent entries={doc.toc} />
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
