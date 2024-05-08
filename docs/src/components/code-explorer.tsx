'use client'
import { useParams } from 'next/navigation'
import { CodePreview } from './code-preview'
import { Tabs } from './ui'

interface CodeExample {
  code: string
  framework: string
  html: string
}

interface Props {
  examples: CodeExample[]
}

export const CodeExplorer = (props: Props) => {
  const { examples } = props
  const params = useParams<{ framework: string }>()
  return (
    <Tabs.Root defaultValue={params.framework} variant="enclosed" size="sm" className="not-prose">
      <Tabs.List borderBottomRadius="0" borderBottomWidth="0" bg="bg.default">
        {examples.map((example) => (
          <Tabs.Trigger
            key={example.framework}
            value={example.framework}
            textTransform="capitalize"
          >
            {example.framework}
          </Tabs.Trigger>
        ))}
        <Tabs.Indicator boxShadow="none" bg="gray.3" />
      </Tabs.List>
      {examples.map((example) => (
        <Tabs.Content
          key={example.framework}
          value={example.framework}
          p="0"
          borderWidth="1px"
          borderColor="gray.dark.4"
          borderBottomRadius="xl"
          overflow="hidden"
        >
          <CodePreview code={example.code} html={example.html} />
        </Tabs.Content>
      ))}
    </Tabs.Root>
  )
}
