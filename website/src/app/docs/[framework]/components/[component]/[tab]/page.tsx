import { ComponentAPIReference } from '@/components/docs/ComponentAPIReference'
import { Markdown } from '@/components/docs/Markdown'
import { Playground } from '@/components/docs/Playground'
import { findComponentDocumentByFrameworkAndId, getComponentDocuments } from '@/lib/contentlayer'
import { Box } from '@/panda/jsx'
import { notFound } from 'next/navigation'
import { Stack } from 'panda/jsx/stack'
import { match } from 'ts-pattern'

const Page = (props: any) => {
  const { params } = props
  const doc = findComponentDocumentByFrameworkAndId(params.framework, params.component)

  if (!doc) {
    notFound()
  }

  return match(params.tab)
    .with('props', () => <ComponentAPIReference componentName={doc.name} types={doc.types} />)
    .otherwise(() => (
      <Box width={{ base: 'full', xl: '41rem' }}>
        <Stack gap="12">
          <Playground component={doc.id} />
          <Markdown doc={doc} />
        </Stack>
      </Box>
    ))
}

export default Page

export const generateStaticParams = () => {
  const tabs = ['usage', 'props']
  const frameworks = ['react', 'solid', 'vue']

  return tabs.flatMap((tab) =>
    frameworks.flatMap((framework) =>
      getComponentDocuments(framework).map((component) => ({
        framework,
        component: component.id,
        tab,
      })),
    ),
  )
}
