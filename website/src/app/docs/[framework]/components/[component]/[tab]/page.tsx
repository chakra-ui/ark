import { ComponentAPIReference } from '@/components/docs/ComponentAPIReference'
import { Markdown } from '@/components/docs/Markdown'
import { Playground } from '@/components/docs/Playground'
import { findComponentDocumentByFrameworkAndId, getComponentDocuments } from '@/lib/contentlayer'
import { notFound } from 'next/navigation'
import { Stack } from 'panda/jsx/stack'
import { match } from 'ts-pattern'

const Page = (props: any) => {
  const { params } = props
  const document = findComponentDocumentByFrameworkAndId(params.framework, params.component)

  if (!document) {
    notFound()
  }

  return match(params.tab)
    .with('props', () => (
      <ComponentAPIReference componentName={document.name} types={document.types} />
    ))
    .otherwise(() => (
      <Stack gap="12">
        <Playground component={document.id} />
        <Markdown markdown={document.body.code} />
      </Stack>
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
