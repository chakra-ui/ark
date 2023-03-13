import { ComponentAPIReference } from '@/components/docs/ComponentAPIReference'
import { DocsFooter } from '@/components/docs/DocsFooter'
import { Markdown } from '@/components/docs/Markdown'
import { Playground } from '@/components/docs/Playground'
import { findComponentDocumentByFrameworkAndId, getComponentDocuments } from '@/lib/contentlayer'
import { Stack } from '@/panda/jsx'
import { notFound } from 'next/navigation'
import { match } from 'ts-pattern'

const Page = (props: any) => {
  const { params } = props
  const doc = findComponentDocumentByFrameworkAndId(params.framework, params.component)

  if (!doc) {
    notFound()
  }

  return (
    <Stack gap="12" width={{ base: 'full', xl: '41rem' }}>
      {match(params.tab)
        .with('props', () => <ComponentAPIReference componentName={doc.name} types={doc.types} />)
        .otherwise(() => (
          <>
            <Playground component={doc.id} />
            <Markdown doc={doc} />
          </>
        ))}
      <DocsFooter doc={doc} />
    </Stack>
  )
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
