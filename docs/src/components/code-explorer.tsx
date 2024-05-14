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
    <Tabs.Root
      defaultValue={params.framework}
      variant="line"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="gray.dark.2"
      size="sm"
      className="not-prose"
    >
      <Tabs.List
        bg="gray.dark.a2"
        boxShadow="none"
        borderBottomWidth="1px"
        borderBottomColor="gray.dark.5"
        px="4"
        alignItems="center"
      >
        {examples.map((example) => (
          <Tabs.Trigger
            key={example.framework}
            value={example.framework}
            textTransform="capitalize"
            color="gray.dark.11"
            _selected={{ color: 'white' }}
            pb="0"
            h="39px"
          >
            {example.framework}
          </Tabs.Trigger>
        ))}
        <Tabs.Indicator />
      </Tabs.List>
      {examples.map((example) => (
        <Tabs.Content key={example.framework} value={example.framework} pt="0">
          <CodePreview code={example.code} html={example.html} />
        </Tabs.Content>
      ))}
    </Tabs.Root>
  )
}
