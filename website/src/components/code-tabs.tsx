'use client'
import { CodePreview } from './code-preview'
import { Tabs } from './ui'

interface CodeExample {
  label: string
  value: string
  code: string
  html: string
}

interface Props {
  defaultValue: string
  examples: CodeExample[]
}

export const CodeTabs = (props: Props) => {
  const { examples, defaultValue } = props

  return (
    <Tabs.Root
      defaultValue={defaultValue}
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
            key={example.value}
            value={example.value}
            color="gray.dark.11"
            _selected={{ color: 'white' }}
            pb="0"
            h="39px"
          >
            {example.label}
          </Tabs.Trigger>
        ))}
        <Tabs.Indicator />
      </Tabs.List>
      {examples.map((example) => (
        <Tabs.Content key={example.value} value={example.value} pt="0">
          <CodePreview code={example.code} html={example.html} />
        </Tabs.Content>
      ))}
    </Tabs.Root>
  )
}
