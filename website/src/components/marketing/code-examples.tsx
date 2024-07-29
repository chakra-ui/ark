import { codeToHtml } from 'shiki'
import { Tabs } from '~/components/ui/tabs'
import { CodePreview } from '../code-preview'
import * as snippets from './code-snippets'

export const CodeExamples = async () => {
  return (
    <Tabs.Root
      defaultValue="react"
      variant="line"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="gray.dark.2"
    >
      <Tabs.List
        bg="gray.dark.a2"
        boxShadow="none"
        borderBottomWidth="1px"
        borderBottomColor="gray.dark.5"
        pt="2"
        px="4"
      >
        {['react', 'solid', 'vue'].map((framework) => (
          <Tabs.Trigger
            key={framework}
            value={framework}
            textTransform="capitalize"
            color="gray.dark.11"
            _selected={{ color: 'white' }}
          >
            {framework}
          </Tabs.Trigger>
        ))}
        <Tabs.Indicator />
      </Tabs.List>
      {Object.entries(snippets).map(async ([key, code]) => {
        const html = await codeToHtml(code, {
          lang: key === 'vue' ? 'vue' : 'tsx',
          theme: 'github-dark-default',
        })
        return (
          <Tabs.Content key={key} value={key} pt="0">
            <CodePreview code={code} html={html} />
          </Tabs.Content>
        )
      })}
    </Tabs.Root>
  )
}
