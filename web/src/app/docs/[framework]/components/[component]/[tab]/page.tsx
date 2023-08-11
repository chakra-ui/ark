import { notFound } from 'next/navigation'
import { Stack } from 'styled-system/jsx'
import { match } from 'ts-pattern'
import { ComponentAPIReference } from '~/components/component-api-reference'
import { Markdown } from '~/components/markdown'
import { DocsFooter } from '~/components/navigation/docs-footer'
import { Playground } from '~/components/playground'
import { findComponentDocumentByFrameworkAndId, getComponentDocuments } from '~/lib/contentlayer'

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
